import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginRequestError } from '../interfaces/login';

@Injectable({
  providedIn: 'root',
})
export class AuthentificationService {
  private http = inject(HttpClient);
  private route = environment.url_api;

  constructor() {}

  login(email: string, password: string) {
    return this.http
      .post(`${this.route}/auth/login`, {
        email: email,
        password: password,
      })
      .pipe(catchError(this.errorRequest));
  }
  register() {}

  errorRequest(httpError: HttpErrorResponse): Observable<LoginRequestError> {
    return of({ ...httpError.error, error: true });
  }
}
