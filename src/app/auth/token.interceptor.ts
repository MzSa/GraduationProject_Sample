import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(public auth: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // console.log(this.auth.getJwtToken());
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.auth.getJwtToken()}`,
      },
    });
    return next.handle(req);
  }

}
