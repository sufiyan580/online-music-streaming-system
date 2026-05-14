from django.shortcuts import render

# Create your views here.
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Playlist

@api_view(['GET'])
def get_playlists(request):
    data = []
    for playlist in Playlist.objects.all():
        data.append({
            "id": playlist.id,
            "name": playlist.name,
            "songs": [
                {
                    "title": song.title,
                    "artist": song.artist,
                    "audio_url": song.audio_url,
                    "cover_url": song.cover_url
                }
                for song in playlist.songs.all()
            ]
        })
    return Response(data)
