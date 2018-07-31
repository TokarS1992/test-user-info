import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { User } from '../interfaces/user';
import {Observable} from "rxjs/observable";
import { ErrorsTypes } from '../utils/abstructError';

@Injectable()
export class ProductService extends ErrorsTypes {
    constructor(
        private http: HttpClient
    ) {
        super();
    }
    public createProduct(body: any) {
        return this.http.post('/api/products', body).pipe(
            map(data => data),
            catchError(this.handleCatchError)
        );
    }
    public updateProductById(id: number, body) {
        return this.http.put(`/api/users/${id}`, body).pipe(
            map((data: any) => {
                return data;
            }),
            catchError(this.handleCatchError)
        );
    }
}
