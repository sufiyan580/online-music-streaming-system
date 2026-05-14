from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.register),
    path('songs/', views.song_list),
    path('play/<int:song_id>/', views.play_song),
    path('recent/', views.get_recently_played),
    path('recommended/', views.recommended_songs),
]
