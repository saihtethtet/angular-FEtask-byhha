import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  standalone: false,
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  username = '';
  password = '';
   error = '';

  constructor(private auth: AuthService, private router: Router) {}

  onRegister(): void {
    const trimmedUsername = this.username.trim();
    const trimmedPassword = this.password.trim();

    // Check for empty fields
    if (!trimmedUsername || !trimmedPassword) {
      this.error = 'Username and password are required.';
      return;
    }

    // Attempt registration
    const success = this.auth.register(trimmedUsername, trimmedPassword);
    if (!success) {
      this.error = 'Username already exists.';
      return;
    }

    // Clear error and navigate
    this.error = '';
    this.router.navigate(['/login']);
  }
}
