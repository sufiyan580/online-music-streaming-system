import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private API = 'http://127.0.0.1:8000';
;

  constructor(private http: HttpClient) {}

  login(data: any) {
      return this.http.post(`${this.API}/login/`, data);
    }

    register(data: any) {
      return this.http.post(`${this.API}/register/`, data);
    }


  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }
}
