import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  username = '';
  email = '';
  password = '';

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  register() {
    this.auth.register({
      username: this.username,
      email: this.email,
      password: this.password
    }).subscribe({
      next: () => {
        alert('Registered successfully! Please login.');
        this.router.navigate(['/']);
      },
      error: (err) => {
        alert(err.error.error || 'Registration failed');
      }
    });
  }

  goLogin() {
    this.router.navigate(['/']);
  }
}
