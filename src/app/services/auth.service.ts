import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

interface User {
  username: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private users: { username: string; password: string }[] = [];
  private loggedInUser: string | null = null;

  register(username: string, password: string): boolean {
    if (this.users.find(u => u.username === username)) {
      return false; // username already exists
    }
    this.users.push({ username, password });
    return true;
  }

  login(username: string, password: string): boolean {
    const user = this.users.find(u => u.username === username && u.password === password);
    if (user) {
      this.loggedInUser = username;
      return true;
    }
    return false;
  }

  logout(): void {
    this.loggedInUser = null;
  }

  isLoggedIn(): boolean {
    return this.loggedInUser !== null;
  }

  getCurrentUser(): string | null {
    return this.loggedInUser;
  }
}

