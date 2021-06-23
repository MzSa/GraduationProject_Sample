import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {RegisterRequestPayload} from './register-request.payload';
import {AuthService} from '../auth.service';
import {AlertService} from '../alert.service';

@Component({
  selector: 'app-signup',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  loading = false;
  submitted = false;
  signupRequestPayload: RegisterRequestPayload;

  constructor(
    private authService: AuthService,
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this
      .signupRequestPayload = {
      firstName: '',
      lastName: '',
      username: '',
      password: '',
    };
  }


  ngOnInit() {
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
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

    this.signupRequestPayload.firstName = this.f.firstName.value;
    this.signupRequestPayload.lastName = this.f.lastName.value;
    this.signupRequestPayload.username = this.f.username.value;
    this.signupRequestPayload.password = this.f.password.value;

    this.loading = true;
    this.authService.signup(this.signupRequestPayload)
      .subscribe(
        (data) => {
          this.alertService.success('Registration successful', {keepAfterRouteChange: true});
          this.router.navigate(['/login'], {relativeTo: this.route});
        },
        (error) => {
          console.log(error);
          this.alertService.error(error);
        }
      );
  }

}
