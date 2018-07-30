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
        map(data => data),
        catchError(this.handleCatchError)
    );
  }
  public getLocalUser() {
      return JSON.parse(localStorage.getItem('currentUser'));
  }
}
