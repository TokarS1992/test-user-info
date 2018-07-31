import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { User } from '../interfaces/user';
import { Observable } from "rxjs/observable";
import { ErrorsTypes } from '../utils/abstructError';

@Injectable()
export class AuthenticationService extends ErrorsTypes {
  constructor(
      private http: HttpClient
  ) {
      super();
  }
  public login(email: string, pass: string, remember: boolean): Observable<User> {
      return this.http.post('/api/authenticate', { email: email, password: pass, remember: remember}).pipe(
          map((res: User) => {
              return res;
          },
          catchError(this.handleCatchError)
      ));
  }
  public logout() {
      localStorage.removeItem('currentUser');
  }
}
