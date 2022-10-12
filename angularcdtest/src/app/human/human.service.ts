import { Injectable } from "@angular/core";
import { Human } from "./human";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class HumanService {
  endpoint = "http://localhost:3000";
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };

  constructor(private httpClient: HttpClient) {}

  getHumanById(id: any): Observable<any> {
    return this.httpClient
      .get(`${this.endpoint}/human/${id}`)
      .pipe(catchError(this.errorHandler));
  }

  getHuman(): Observable<any> {
    return this.httpClient
      .get(`${this.endpoint}/human`)
      .pipe(catchError(this.errorHandler));
  }

  addHuman(data: Human): Observable<any> {
    return this.httpClient
      .post(`${this.endpoint}/human`, JSON.stringify(data), this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  editHuman(id: any, data: Human): Observable<any> {
    return this.httpClient
      .put(
        `${this.endpoint}/human/${id}`,
        JSON.stringify(data),
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }

  deleteHuman(id: number): Observable<any> {
    return this.httpClient
      .delete(`${this.endpoint}/human/${id}`, this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  // Error handling
  errorHandler(error: HttpErrorResponse) {
    let errorMessage = "";
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
