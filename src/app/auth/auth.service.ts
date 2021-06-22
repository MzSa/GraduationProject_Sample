import {EventEmitter, Injectable, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {LoginRequestPayload} from './signin/login-request.payload';
import {SignupRequestPayload} from './signup/singup-request.payload';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class AuthService {

  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();

  constructor(private httpClient: HttpClient) {
  }

  signup(signupRequestPayload: SignupRequestPayload): Observable<any> {
    return this.httpClient.post(
      'http://192.168.1.109:8080/app-user/register',
      signupRequestPayload,
      {responseType: 'text'}
    );
  }

  login(loginRequestPayload: LoginRequestPayload): Observable<boolean> {
    return this.httpClient
      .post(
        'http://172.20.10.3:8080/login',
        loginRequestPayload, {
          observe: 'response',
          responseType: 'text'
        })
      .pipe(
        map((data) => {
          localStorage.setItem('authenticationToken', data.headers.get('Authorization'));
          this.loggedIn.emit(true);
          return true;
        })
      );
  }

  getJwtToken() {
    // return this.localStorage.retrieve("authenticationToken");
    return localStorage.getItem('authenticationToken');
  }

  /*refreshToken() {
    return this.httpClient
      .post<LoginResponse>(
        "http://192.168.1.113:8081/api/auth/refresh/token",
        this.refreshTokenPayload
      )
      .pipe(
        tap((response) => {
          //this.localStorage.clear("authenticationToken");
          //this.localStorage.clear("expiresAt");

          localStorage.clear();

          /*this.localStorage.store(
            "authenticationToken",
            response.authenticationToken
          );
          this.localStorage.store("expiresAt", response.expiresAt);

          localStorage.setItem("authenticationToken" , response.authenticationToken);
          localStorage.setItem("expiresAt" , response.expiresAt);
          localStorage.setItem("username" , response.username);

        })
      );
  }*/

  logout() {
    localStorage.clear();
  }
}

