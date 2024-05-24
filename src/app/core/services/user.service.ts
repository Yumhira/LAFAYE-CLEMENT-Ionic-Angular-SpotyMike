import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { IUserTest } from '../interfaces/userTest';
import { UserTest } from '../models/user.test.class';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);

  /**
   * Method de tests permettant de pouvoir récupérer un ensemble d'utilisateurs.
   * @returns Un observable contenant un tableau d'utilisateur.
   */
  requestTest(): Observable<IUserTest[]> {
    return this.http
      .get<IUserTest[]>('https://jsonplaceholder.typicode.com/users')
      .pipe(
        map((users: IUserTest[]) => {
          return users.map((user: IUserTest) => {
            user.id = user.id.toString();
            user.artist = { year: 2024, nbLike: 0 };
            return user;
          });
        }),
        catchError(this.errorRequest)
      );
  }

  private errorRequest(error: any): Observable<IUserTest[]> {
    console.error('An error occurred:', error);
    const user: IUserTest = {
      id: '3',
      name: '',
      username: '',
      phone: '',
      website: '',
    };
    return new Observable<IUserTest[]>((observer) => {
      observer.next([
        new UserTest(
          user.id,
          user.name,
          user.username,
          user.phone,
          user.website
        ),
      ]);
    });
  }
}
