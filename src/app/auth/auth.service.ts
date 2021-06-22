import {Injectable} from '@angular/core';
import {Observable, of, Subject} from 'rxjs';
import {SignupRequestPayload} from './signup/singup-request.payload';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {LoginRequestPayload} from './signin/login-request.payload';
import {Router} from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class AuthService {

  // @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();
  private url = 'http://172.20.10.3:8080/login';
  public loginStatus = new Subject<boolean>();

  constructor(private httpClient: HttpClient, private router: Router) {
  }

  signup(signupRequestPayload: SignupRequestPayload): Observable<any> {
    return this.httpClient.post(
      'http://192.168.1.109:8080/app-user/register',
      signupRequestPayload,
      {responseType: 'text'}
    );
  }

  // login(loginRequestPayload: LoginRequestPayload): Observable<boolean> {
  //   return this.httpClient
  //     .post(
  //       'http://172.20.10.3:8080/login',
  //       loginRequestPayload, {
  //         observe: 'response',
  //         responseType: 'text'
  //       })
  //     .pipe(
  //       map((data) => {
  //         localStorage.setItem('authenticationToken', data.headers.get('Authorization'));
  //         // this.loggedIn.emit(true);
  //         this.loginStatus.next(true);
  //         return true;
  //       })
  //     );
  // }

  login(loginRequestPayload: LoginRequestPayload): Observable<any> {
    return this.httpClient.post<any>(this.url, loginRequestPayload, httpOptions).pipe(
      tap((result) => this.save_token(result)),
      catchError(this.handleError<any>('login'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }

  private save_token(data) {
    if (data.success) {
      localStorage.setItem('token', data.token);
      return;
    }
  }

  canActivate(): boolean {
    const token = localStorage.getItem('token');
    if (token == null) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
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

