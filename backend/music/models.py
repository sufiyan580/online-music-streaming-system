from django.db import models

class Song(models.Model):
    title = models.CharField(max_length=200)
    artist = models.CharField(max_length=150)

    genre = models.CharField(max_length=100, null=True, blank=True)
    play_count = models.IntegerField(default=0)

    audio_url = models.URLField()
    cover_url = models.URLField(blank=True, null=True)

    def __str__(self):
        return self.title



from django.contrib.auth.models import User

class RecentlyPlayed(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    song = models.ForeignKey(Song, on_delete=models.CASCADE)
    played_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-played_at']

    def __str__(self):
        return f"{self.user.username} - {self.song.title}"
