import { MusicService } from '../music.service';
import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Router } from '@angular/router';




@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.css']
})
export class SongListComponent implements OnInit {

  @Input() page: string = 'home';

  // 🔹 VIEW STATE (IMPORTANT)
  activeView: 'home' | 'search' | 'library' = 'home';


  songs: any[] = [];
  playlists: any[] = [];

  searchText: string = '';

  @ViewChild('audioPlayer') audioPlayer!: ElementRef<HTMLAudioElement>;

  currentSong: string | null = null;
  isPlaying: boolean = false;

  currentTime: string = '0:00';
  duration: string = '0:00';

  constructor(
    private musicService: MusicService,
    private router: Router
  ) {}

  ngOnInit() {
    // load songs
    this.musicService.getSongs().subscribe((data: any) => {
      this.songs = data;
    });

    // load playlists (library)
    this.playlists = JSON.parse(localStorage.getItem('playlists') || '[]');
  }

  // ================= VIEW SWITCH =================
  showHome() {
    this.activeView = 'home';
  }
  showSearch() {
  this.activeView = 'search';
  }


  showLibrary() {
    this.activeView = 'library';
    // reload playlists every time
    this.playlists = JSON.parse(localStorage.getItem('playlists') || '[]');
  }

  // ================= AUDIO =================
  togglePlay(url: string) {
    const audio = this.audioPlayer.nativeElement;

    if (this.currentSong !== url) {
      audio.pause();
      audio.currentTime = 0;
      audio.src = url;
      audio.load();
      audio.play();

      this.currentSong = url;
      this.isPlaying = true;
    } else {
      if (this.isPlaying) {
        audio.pause();
        this.isPlaying = false;
      } else {
        audio.play();
        this.isPlaying = true;
      }
    }
  }

  updateTime() {
    const audio = this.audioPlayer.nativeElement;
    this.currentTime = this.formatTime(audio.currentTime);
  }

  setDuration() {
    const audio = this.audioPlayer.nativeElement;
    this.duration = this.formatTime(audio.duration);
  }

  formatTime(seconds: number): string {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  // ================= FAVORITES / PLAYLIST =================
  addToFavorites(song: any) {
    const playlistName = prompt('Add to which playlist?');
    if (!playlistName) return;

    let playlists = JSON.parse(localStorage.getItem('playlists') || '[]');

    let playlist = playlists.find((p: any) => p.name === playlistName);

    if (!playlist) {
      playlist = { name: playlistName, songs: [] };
      playlists.push(playlist);
    }

    if (!playlist.songs.find((s: any) => s.audio_url === song.audio_url)) {
      playlist.songs.push(song);
    }

    localStorage.setItem('playlists', JSON.stringify(playlists));
    alert(`Added to ${playlistName}`);
  }

  // ================= LOGOUT =================
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
}
