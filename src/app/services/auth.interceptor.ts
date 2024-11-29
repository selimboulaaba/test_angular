import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzMzMDQzMTk2LCJqdGkiOiIxNjliOTNmYmFhNWQ0ZDRhYTI0ODRiMDZjYjlmZTZiZCIsInVzZXJfaWQiOjU3N30.e4Hc2nUrhZv0XB14vUfeqFsVWrzXhwqOchElg2JwLjo";

      const clonedRequest = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return next.handle(clonedRequest);
  }
}
