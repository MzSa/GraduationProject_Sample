import {NgModule} from '@angular/core';
import {AuthRoutingModule} from './auth-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {AuthComponent} from './auth.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {SigninComponent} from './signin/signin.component';
import {AuthService} from './auth.service';
import {CustomHttpInterceptor} from './custom-http-interceptor';
import {RegisterComponent} from './register/register.component';
import { AlertComponent } from './alert/alert.component';

@NgModule({
  declarations: [
    AuthComponent,
    RegisterComponent,
    SigninComponent,
    AlertComponent
  ],
  imports: [
    ReactiveFormsModule,
    AuthRoutingModule,
    HttpClientModule,
    CommonModule,
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomHttpInterceptor, // change this line with your custom http interceptor
      multi: true
    }
  ],
})
export class AuthModule {
}
