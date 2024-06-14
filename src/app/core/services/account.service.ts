import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { EAccountPage } from '../models/EAccountPage';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor() {}

  getPageAccount() {
    return of(EAccountPage.Account);
  }
}
