import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { of } from 'rxjs';
import { Observable } from 'rxjs/observable';
import { User } from '../interfaces/user';
import 'rxjs-compat';
import {Product} from "../interfaces/product";
import * as _ from 'underscore';

@Injectable()
export class BackendApiInterceptor implements HttpInterceptor {

  constructor() { }
  intercept(request: HttpRequest<any>, next: HttpHandler) {
      const users: User[] = JSON.parse(localStorage.getItem('users')) || [];
      function getIdFromUrl(url: string): number {
          const urlParts = url.split('/');
          return parseInt(urlParts[urlParts.length - 1]);
      }
      function parseQuery(queryString) {
          const query = {};
          const pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
          for (let i = 0; i < pairs.length; i++) {
              const pair = pairs[i].split('=');
              query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
          }
          return query;
      }
      return Observable.of(null).mergeMap(() => {
          if (request.url.endsWith('/api/authenticate') && request.method === 'POST') {
              const findedUsers = users.filter(user => {
                  return user.email === request.body.email &&
                         user.password === request.body.password;
              });

              if (findedUsers.length) {
                  const user = findedUsers[0];
                  const body: User = {
                      id: user.id,
                      username: user.username,
                      secondname: user.secondname,
                      phone: user.phone,
                      email: user.email,
                      password: user.password,
                      remember: request.body.remember,
                      products: user.products,
                      token: 'fake-jwt-token'
                  };
                  // return status 200 and body find user
                  if (!request.body.remember) {
                      body.timestamp = new Date().valueOf();
                  }
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
            newUser.products = [];
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));
            return Observable.of(new HttpResponse({ status: 201, body: newUser }));
          }
          if (request.url.match(/\/api\/users\/\d+$/) && request.method === 'GET') {
              const id = getIdFromUrl(request.url);
              const currentUser = JSON.parse(localStorage.getItem('currentUser'));
              const findedUsers = users.filter((user: User) => {
                  return user.id === id;
              }).map((user: User) => {
                  delete user.password;
                  delete user.token;
                  return user;
              });
              if (findedUsers.length) {
                  if (findedUsers[0].id !== currentUser.id) {
                      return Observable.throwError('Not access');
                  }
                  return Observable.of(new HttpResponse({ status: 200, body: findedUsers[0] }));
              }
              return Observable.throwError({ status: 404, body: 'User not found' });
          }
          if (request.url.match(/\/api\/users\/\d+$/) && request.method === 'PUT') {
              const body = request.body;
              const id = getIdFromUrl(request.url);
              let findedUser: User[]|User = users.filter((user: any) => {
                 return user.id === id;
              });
              if (findedUser) {
                  findedUser = findedUser[0];
                  for (const key in body) {
                      if (body.hasOwnProperty(key)) {
                          findedUser[key] = body[key];
                      }
                  }
                  users.map((user: any) => {
                     if (user.id === id) {
                         user = findedUser;
                     }
                     return user;
                  });
              }
              localStorage.setItem('currentUser', JSON.stringify(findedUser));
              localStorage.setItem('users', JSON.stringify(users));
              return Observable.of(new HttpResponse({ status: 200, body: findedUser}));
          }
          if (request.url.endsWith('/api/products') && request.method === 'POST') {
              const body = request.body;
              const currentUser: User = JSON.parse(localStorage.getItem('currentUser'));
              body.id = currentUser.products.length + 1;
                  let findedUser: User[]|User = users.filter((user: any) => {
                  return user.id === currentUser.id;
              });

              if (findedUser) {
                  findedUser = findedUser[0];
                  findedUser.products.push(body);
                  users.map((user: any) => {
                      if (user.id === currentUser.id) {
                          user = findedUser;
                      }
                      return user;
                  });
              }
              currentUser.products.push(body);
              localStorage.setItem('currentUser', JSON.stringify(currentUser));
              localStorage.setItem('users', JSON.stringify(users));
              return Observable.of(new HttpResponse({ status: 201, body: body}));
          }
          if (request.url.match(/\/api\/products\/\d+$/) && request.method === 'PUT') {
              const id = getIdFromUrl(request.url);
              const body = request.body;
              const currentUser: User = JSON.parse(localStorage.getItem('currentUser'));
              let findedProduct: Product[]|Product = currentUser.products.filter((product: Product) => {
                  return product.id === id;
              });
              if (findedProduct) {
                  findedProduct = findedProduct[0];
                  for (const key in body) {
                      if (body.hasOwnProperty(key)) {
                          findedProduct[key] = body[key];
                      }
                  }
                  currentUser.products.map((product: any) => {
                      if (product.id === id) {
                          product = findedProduct;
                      }
                      return product;
                  });
                  users.map((user: any) => {
                      if (user.id === id) {
                          user = currentUser;
                      }
                      return user;
                  });
              }
              localStorage.setItem('currentUser', JSON.stringify(currentUser));
              localStorage.setItem('users', JSON.stringify(users));
              return Observable.of(new HttpResponse({ status: 200, body: findedProduct}));
          }
          if (request.url.match(/\/api\/products\/\d+$/) && request.method === 'DELETE') {
              const id = getIdFromUrl(request.url);
              const currentUser: User = JSON.parse(localStorage.getItem('currentUser'));
              currentUser.products = currentUser.products.filter((product: any) => {
                  return product.id !== id;
              });
              users.map((user: any) => {
                  if (user.id === currentUser.id) {
                      user.products = currentUser.products;
                  }
                  return user;
              });
              localStorage.setItem('currentUser', JSON.stringify(currentUser));
              localStorage.setItem('users', JSON.stringify(users));
              return Observable.of(new HttpResponse({ status: 204, body: `Product with id: ${id} was deleted`}));
          }
      });
  }
}