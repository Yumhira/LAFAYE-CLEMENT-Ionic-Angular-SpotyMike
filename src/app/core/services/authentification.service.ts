import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ILoginRequestError, ILoginRequestSuccess } from '../interfaces/login';
import { updateUser } from './../store/action/user.action';

@Injectable({
  providedIn: 'root',
})
export class AuthentificationService {
  private http = inject(HttpClient);
  private route = environment.url_api;

  constructor() {}

  // login(email: string, password: string) {
  //   return this.http
  //     .post(`${this.route}/auth/layoutLogin/login`, {
  //       email: email,
  //       password: password,
  //     })
  //     .pipe(catchError(this.errorRequest));
  // }
  // register(firstname: string, lastname: string, email: string, password: string, birthdate: Date, tel?: string, sexe?: boolean) {
  //   return this.http
  //     .post(`${this.route}/auth/layoutRegister/register`, {
  //       firstname: firstname,
  //       lastname: lastname,
  //       email: email,
  //       password: password,
  //       birthdate: birthdate,
  //       tel: tel,
  //       sexe: sexe
  //     })
  //     .pipe(catchError(this.errorRequest));
  // }

  // passwordLost(email: string, password: string) {
  //   return this.http
  //     .post(`${this.route}/auth/layoutLogin/login`, {
  //       email: email,
  //       password: password,
  //     })
  //     .pipe(catchError(this.errorRequest));
  // }

  errorRequest(httpError: HttpErrorResponse): Observable<ILoginRequestError> {
    return of({ ...httpError.error, error: true });
  }
}
