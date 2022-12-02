import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, debounceTime, throttleTime } from 'rxjs/operators';

// import 'rxjs/add/operator/debounceTime';
// import 'rxjs/add/operator/throttleTime';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}
  get(url: string, params: any): Observable<any> {
    const urlParams = new URLSearchParams(params as string).toString();
    return this.http
      .get<any>(url + '?' + urlParams)
      .pipe(
        debounceTime(300),
        throttleTime(300),
        retry(1),
        catchError(this.handleError)
      );
  }
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
