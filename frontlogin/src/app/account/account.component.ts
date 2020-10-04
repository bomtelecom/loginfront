import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthentificationService } from '../services/authentification.service';
import { User } from '../models/User';

@Component({
  selector: 'account-root',
  templateUrl: './account.component.html',
})
export class AccountComponent {

    constructor(
        private router: Router,
    ) {
    }
}
