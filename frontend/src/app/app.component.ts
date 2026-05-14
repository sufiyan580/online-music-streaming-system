import { Component } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {

  playlists: any[] = [];
  selectedPlaylist: any = null;

  activePage: string = 'home';

  @ViewChild('audioPlayer') audioPlayer!: ElementRef<HTMLAudioElement>;

  currentSong: string | null = null;
  isPlaying: boolean = false;


  showHome() {
    this.activePage = 'home';
  }

  showSearch() {
    this.activePage = 'search';
  }

  showLibrary() {
    this.activePage = 'library';
  }

 

    ngOnInit() {
      this.playlists = JSON.parse(localStorage.getItem('playlists') || '[]');
    }

    
    playFromLibrary(url: string) {
      const audio = this.audioPlayer.nativeElement;

      if (this.currentSong !== url) {
        // switching to a new song
        audio.pause();
        audio.currentTime = 0;
        audio.src = url;
        audio.load();
        audio.play();

        this.currentSong = url;
        this.isPlaying = true;
      } else {
        // toggling same song
        if (this.isPlaying) {
          audio.pause();
          this.isPlaying = false;
        } else {
          audio.play();
          this.isPlaying = true;
        }
      }
    }


    removeFromPlaylist(playlistName: string, audioUrl: string) {

      let playlists = JSON.parse(localStorage.getItem('playlists') || '[]');

      const playlist = playlists.find((p: any) => p.name === playlistName);
      if (!playlist) return;

      playlist.songs = playlist.songs.filter(
        (song: any) => song.audio_url !== audioUrl
      );

      localStorage.setItem('playlists', JSON.stringify(playlists));
      this.playlists = playlists;
    }

    openPlaylist(playlist: any) {
      this.selectedPlaylist = playlist;
    }

    closePlaylist() {
      this.selectedPlaylist = null;
    }

    isLoggedIn(): boolean {
      return !!localStorage.getItem('token');
    }

   logout() {
      localStorage.removeItem('token');
      this.activePage = 'home';
      this.selectedPlaylist = null;
    }


}
