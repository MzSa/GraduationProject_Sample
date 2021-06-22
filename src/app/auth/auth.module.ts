import {NgModule} from '@angular/core';
import {AuthRoutingModule} from './auth-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {AuthComponent} from './auth.component';
import {HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {SignupComponent} from './signup/signup.component';
import {SigninComponent} from './signin/signin.component';

@NgModule({
  declarations: [
    AuthComponent,
    SignupComponent,
    SigninComponent
  ],
  imports: [
    ReactiveFormsModule,
    AuthRoutingModule,
    HttpClientModule,
    CommonModule
  ]
})
export class AuthModule {
}
