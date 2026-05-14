from django.contrib.auth.models import User
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from .models import Song, RecentlyPlayed
from .serializers import SongSerializer


# ---------------- REGISTER ----------------
@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')

    if User.objects.filter(username=username).exists():
        return Response({"error": "Username already exists"}, status=400)

    User.objects.create_user(
        username=username,
        email=email,
        password=password
    )

    return Response({"message": "User registered successfully"}, status=201)


# ---------------- SONG LIST ----------------
@api_view(['GET'])
@permission_classes([AllowAny])
def song_list(request):
    songs = Song.objects.all()
    serializer = SongSerializer(songs, many=True)
    return Response(serializer.data)


# ---------------- PLAY SONG ----------------
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def play_song(request, song_id):
    try:
        song = Song.objects.get(id=song_id)

        # Increase play count
        song.play_count += 1
        song.save()

        # Remove if already exists
        RecentlyPlayed.objects.filter(user=request.user, song=song).delete()

        # Add new record
        RecentlyPlayed.objects.create(user=request.user, song=song)

        # Keep only last 10
        recent = RecentlyPlayed.objects.filter(user=request.user)
        if recent.count() > 10:
            recent.last().delete()

        return Response({"message": "Song played successfully"})

    except Song.DoesNotExist:
        return Response({"error": "Song not found"}, status=404)


# ---------------- RECENTLY PLAYED ----------------
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_recently_played(request):
    recent = RecentlyPlayed.objects.filter(user=request.user)
    songs = [r.song for r in recent]
    serializer = SongSerializer(songs, many=True)
    return Response(serializer.data)


# ---------------- RECOMMENDED SONGS ----------------
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def recommended_songs(request):
    recent = RecentlyPlayed.objects.filter(user=request.user)

    if recent.exists():
        last_song = recent.first().song
        recommended = Song.objects.filter(
            genre=last_song.genre
        ).exclude(id=last_song.id).order_by('-play_count')[:5]
    else:
        recommended = Song.objects.all().order_by('-play_count')[:5]

    serializer = SongSerializer(recommended, many=True)
    return Response(serializer.data)
