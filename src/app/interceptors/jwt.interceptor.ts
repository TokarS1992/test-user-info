import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { Observable } from 'rxjs/observable';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor() { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (currentUser && currentUser.token) {
          currentUser.token = `Bearer ${currentUser.token}`;
          localStorage.setItem('currentUser', JSON.stringify(currentUser));
      }
      return Observable.of(new HttpResponse({ status: 200, body: currentUser }));
  }
}