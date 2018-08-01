import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { UserService } from './user.service';
import {Observable} from "rxjs/observable";
import { ErrorsTypes } from '../utils/abstructError';

@Injectable()
export class ProductService extends ErrorsTypes {
    constructor(
        private http: HttpClient,
        private userService: UserService
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
        return this.http.put(`/api/products/${id}`, body).pipe(
            map((data: any) => {
                return data;
            }),
            catchError(this.handleCatchError)
        );
    }
    public deleteProduct(id: number) {
        return this.http.delete(`/api/products/${id}`).pipe(
            map((data: any) => {
                return data;
            }),
            catchError(this.handleCatchError)
        );
    }
    // public getProducts(pageNumber: any, pageSize: any) {
    //     let params = new HttpParams();
    //     params = params.set('pageNumber', pageNumber).set('pageSize', pageSize);
    //     return this.http.get('/api/products', { params }).pipe(
    //         map((data: any) => {
    //             return data;
    //         }),
    //         catchError(this.handleCatchError)
    //     );
    // }
    public getProducts(pageNumber: number, pageSize: number) {
        return this.userService
            .getLocalUser()
            .products
            .slice(pageNumber === 0 ? 0 : pageNumber * pageSize, pageNumber === 0 ? pageSize : (pageNumber + 1) * pageSize);
    }
    public getLocalProducts() {
        return this.userService
            .getLocalUser()
            .products;
    }
}
