import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

import {AuthService} from '../auth.service';
import {LoginRequestPayload} from './login-request.payload';
import {throwError} from 'rxjs';
import {AlertService} from '../alert.service';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  form: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  loginRequestPayload: LoginRequestPayload;

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      public auth: AuthService,
      private alertService: AlertService
  ) {
    this.loginRequestPayload = {
      userName: '',
      password: '',
    };
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;

    this.loginRequestPayload.userName = this.f.username.value;
    this.loginRequestPayload.password = this.f.password.value;

    this.auth.login(this.loginRequestPayload)
        .subscribe(
            (data) => {
              if (localStorage.getItem('authenticationToken') !== 'null') {
                console.log(this.auth.getJwtToken());
                this.router.navigateByUrl('/dashboard');

              }
            },
            (error) => {
              throwError(error);
              alert('Login Failed');
            }
        );
  }

}
