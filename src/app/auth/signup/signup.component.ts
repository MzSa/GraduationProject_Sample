import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
// import { ToastrService } from "ngx-toastr";
import {AuthService} from '../auth.service';
import {SignupRequestPayload} from './singup-request.payload';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupRequestPayload: SignupRequestPayload;
  signupForm: FormGroup;

  mobnumPattern = '^((\\+91-?)|0)?[0-9]{10}$';

  types: any = ['Admin', 'User'];

  selectedType = '';

  selectChangeTypeHandler(event: any) {

    this.selectedType = event.target.value;
  }

  constructor(private authService: AuthService, private router: Router) {
    this.signupRequestPayload = {
      name: '',
      userName: '',
      password: '',
      email: '',
      mobileNumber: '',
      address: ''
    };
  }


  ngOnInit() {
    this.signupForm = new FormGroup({
      name: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      mobileNumber: new FormControl('', [
        Validators.required,
        Validators.pattern(this.mobnumPattern),
      ]),
      address: new FormControl('', Validators.required)
    });
  }

  signup() {
    this.signupRequestPayload.name = this.signupForm.get('name').value;
    this.signupRequestPayload.userName = this.signupForm.get('username').value;
    this.signupRequestPayload.password = this.signupForm.get('password').value;
    this.signupRequestPayload.email = this.signupForm.get('email').value;
    this.signupRequestPayload.mobileNumber = this.signupForm.get(
      'mobileNumber'
    ).value;
    this.signupRequestPayload.address = this.signupForm.get('address').value;
    this.authService.signup(this.signupRequestPayload).subscribe(
      (data) => {
        this.router.navigate(['/login']);
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
