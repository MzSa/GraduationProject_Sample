import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {throwError} from 'rxjs';

import {AuthService} from '../auth.service';
import {LoginRequestPayload} from './login-request.payload';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  loginForm: FormGroup;
  loginRequestPayload: LoginRequestPayload;
  isError: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    public auth: AuthService
  ) {
    this.loginRequestPayload = {
      userName: '',
      password: '',
    };
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  login() {
    this.loginRequestPayload.userName = this.loginForm.get('username').value;
    this.loginRequestPayload.password = this.loginForm.get('password').value;

    this.authService.login(this.loginRequestPayload).subscribe(
      (data) => {
        this.isError = false;
        if (localStorage.getItem('authenticationToken') !== 'null') {
          console.log(this.auth.getJwtToken());
          this.router.navigateByUrl('/cars');

        }
      },
      (error) => {
        this.isError = true;
        throwError(error);
        alert('Login Failed');
      }
    );
  }

}
