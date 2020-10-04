import { Component } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../models/user';
import { UserService} from '../services/user.service';
import {  AuthentificationService } from '../services/authentification.service';

@Component({
  templateUrl: './home.component.html',
})
export class HomeComponent {
  loading = false;
  users: User[];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loading = true;
    this.userService.getAll().pipe(first()).subscribe(users => {
      this.loading = false;
      this.users = users;
    })
  }

}
