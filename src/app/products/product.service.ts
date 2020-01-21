import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { IProduct } from "./product";

@Injectable({
    providedIn: 'root'
})
export class ProductService
{
    private productUrl = 'api/products/products.json'; //fetch data from a local file for testing

    constructor(private httpClient: HttpClient) 
    {
    }

    getProducts(): Observable<IProduct[]>
    {
        return this.httpClient.get<IProduct[]>(this.productUrl)
            .pipe(
                tap(data => console.log('All products: ' + JSON.stringify(data))),
                catchError(this.handleError)
            );
    }

    handleError(error: HttpErrorResponse)
    {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent)
        {
            //a client side or network error occured.
            errorMessage = error.error.message;
        }
        else
        {
            // the server returned an unsuccessful response code. The response body may contain clues as to what went wrong.
            errorMessage = `Response code ${ error.status }, message: ${ error.message }`;
        }
        console.log(errorMessage);
        return throwError(errorMessage);
    }
}