from django.urls import path
from .views import get_playlists

urlpatterns = [
    path('playlists/', get_playlists),
]
