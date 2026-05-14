import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username = '';
  password = '';

  constructor(private router: Router) {}

  login() {
    // TEMP LOGIN (no backend yet)
    if (this.username && this.password) {
      // fake login success
      localStorage.setItem('token', 'dummy-token');

      // ✅ GO TO HOME PAGE
      this.router.navigate(['/home']);
    } else {
      alert('Enter username and password');
    }
  }

  goRegister() {
    this.router.navigate(['/register']);
  }
}
