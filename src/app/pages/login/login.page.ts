import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class LoginPage {
  email: string = '';
  password: string = '';

  constructor(private router: Router) {}

  login() {
    // Simple validation (in real app, authenticate with backend)
    if (this.email && this.password) {
      console.log('Login successful:', this.email);
      this.router.navigate(['/search']);
    } else {
      alert('Please enter both email and password');
    }
  }

  goToRegistration() {
    this.router.navigate(['/registration']);
  }
}