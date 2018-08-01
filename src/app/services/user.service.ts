import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { User } from '../interfaces/user';
import {Observable} from "rxjs/observable";
import { ErrorsTypes } from '../utils/abstructError';

@Injectable({
  providedIn: 'root'
})
export class UserService extends ErrorsTypes {
  constructor(
      private http: HttpClient
  ) {
      super();
  }
  public createUser(body: any) {
    return this.http.post('/api/users', body).pipe(
        map(data => data),
        catchError(this.handleCatchError)
    );
  }
  public getUserById(id: number) {
    return this.http.get(`/api/users/${id}`).pipe(
        map((data: any) => {
            return data;
        }),
        catchError(this.handleCatchError)
    );
  }
  public updateUserById(id: number, body) {
    return this.http.put(`/api/users/${id}`, body).pipe(
        map((data: any) => {
            return data;
        }),
        catchError(this.handleCatchError)
    );
  }
  public changePass(body) {
      return this.http.post('/api/change', body).pipe(
          map((data: any) => {
              return data;
          }),
          catchError(this.handleCatchError)
      );
  }
  public getLocalUser() {
      return JSON.parse(localStorage.getItem('currentUser'));
  }
}
