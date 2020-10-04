import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { UserService} from '../services/user.service';
import { AuthentificationService} from '../services/authentification.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  form: FormGroup;
    id: string;
    isAddMode: boolean = true;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthentificationService,
        private userService: UserService
    ) {}

    ngOnInit() {
      this.id = this.route.snapshot.params['id'];
      // password not required in edit mode


      this.form = this.formBuilder.group({
          firstName: ['', Validators.required],
          lastName: ['', Validators.required],
          username: ['', Validators.required],
          password: ['', Validators.required]
      });

      this.userService.getById(this.id)
              .pipe(first())
              .subscribe(x => {
                  this.f.firstName.setValue(x.firstName);
                  this.f.lastName.setValue(x.lastName);
                  this.f.username.setValue(x.username);
              });
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.form.invalid) {
          return;
      }

      this.loading = true;
      this.updateUser();
  }



  private updateUser() {
      this.authService.update(this.id, this.form.value)
          .pipe(first())
          .subscribe(
              data => {
                  this.router.navigate(['..', { relativeTo: this.route }]);
              },
              error => {
                  this.loading = false;
              });
  }
}