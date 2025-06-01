import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  showNavbar: boolean = false;
  activeMenu: string | null = null;

  constructor(public router: Router, public auth: AuthService, private route: ActivatedRoute) {
     this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showNavbar = !['/login', '/register', '/'].includes(event.urlAfterRedirects);

        const url = this.router.url;

        if (url.startsWith('/list')) {
          this.activeMenu = 'list';
        } else if (url.startsWith('/favorites')) {
          this.activeMenu = 'favorites';
        } else if (url.startsWith('/detail')) {
          const fromParam = this.route.snapshot.queryParamMap.get('from');
          this.activeMenu = fromParam === 'favorites' ? 'favorites' : 'list';
        } else {
          this.activeMenu = null;
        }

      }
    });
  }

  onLogout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
