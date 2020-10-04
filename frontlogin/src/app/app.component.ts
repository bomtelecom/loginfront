import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthentificationService } from './services/authentification.service';
import { User } from './models/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  currentUser: User;
  isLoggedin: boolean=false;

    constructor(
        private router: Router,
        private authenticationService: AuthentificationService
    ) {
        this.authenticationService.curentUser.subscribe(x => 
          {
            this.currentUser = x,
            this.isLoggedin = this.currentUser && this.currentUser.username!=""
          });
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}
