import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { of } from 'rxjs';
import { Observable } from 'rxjs/observable';
import { User } from '../interfaces/user';
import 'rxjs-compat';

@Injectable()
export class BackendApiInterceptor implements HttpInterceptor {

  constructor() { }
  intercept(request: HttpRequest<any>, next: HttpHandler) {
      const users: User[] = JSON.parse(localStorage.getItem('users')) || [];

      return Observable.of(null).mergeMap(() => {
          if (request.url.endsWith('/api/authenticate') && request.method === 'POST') {
              const findedUsers = users.filter(user => {
                  return user.email === request.body.email &&
                         user.password === request.body.password;
              });

              if (findedUsers.length) {
                  const user = findedUsers[0];
                  const body = {
                      id: user.id,
                      username: user.username,
                      secondname: user.secondname,
                      phone: user.phone,
                      email: user.email,
                      password: user.password,
                      token: 'fake-jwt-token'
                  };
                  // return status 200 and body find user
                  localStorage.setItem('currentUser', JSON.stringify(body));
                  return next.handle(request);
              } else {
                  // else return 400 bad request
                  return Observable.throwError('Username or password is incorrect');
              }
          }
          if (request.url.endsWith('/api/users') && request.method === 'POST') {
            const newUser: User = request.body;
            const duplicateUser = users.filter(user => {
                return user.email === newUser.email;
            }).length;
            if (duplicateUser) {
                return Observable.throwError(`User ${request.body.username} has already email`);
            }
            newUser.id = users.length + 1;
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));
            return Observable.of(new HttpResponse({ status: 200, body: newUser }));
          }
      });
  }
}
