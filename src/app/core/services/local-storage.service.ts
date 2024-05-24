import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  getElement(key: string) {
    return JSON.parse(localStorage.getItem(key) ?? '[]');
  }
  setElement(key: string, data: string) {
    localStorage.setItem(key, data);
  }
}
