import { CanActivateFn } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';
import { inject } from '@angular/core';
import { IToken } from '../interfaces/user';

export const authGuard: CanActivateFn = async (route, state) => {
  const localStore = inject(LocalStorageService);
  const token = await localStore.getItem('token').getValue();
  return token != new Array() ? true : false;
};
