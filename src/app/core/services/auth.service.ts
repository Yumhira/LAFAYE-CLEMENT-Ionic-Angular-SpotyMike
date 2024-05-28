import { Injectable } from '@angular/core';
import { EAuthPage } from '../models/refData';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() { }

  getPageAuth() {
    return of(EAuthPage.Login);
  }
}
