import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MusicService {

  apiUrl = 'http://127.0.0.1:8000/songs/';

  constructor(private http: HttpClient) {}

  getSongs() {
    return this.http.get(this.apiUrl);
  }
}
