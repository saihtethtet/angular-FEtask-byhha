import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  standalone: false,
  selector: 'app-login',
  templateUrl: './login.component.html',
  // imports: [CommonModule, RouterModule]
})
export class LoginComponent {
  username = '';
  password = '';
  error = false;

  constructor(private auth: AuthService, private router: Router) {}

  onLogin(): void {
    if (this.auth.login(this.username, this.password)) {
      this.router.navigate(['/list']);
    } else {
      this.error = true;
    }
  }
}
