import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = async (route, state) => {
  const localStore = inject(LocalStorageService);
  const router = inject(Router);
  const token = await localStore.getItem('token').getValue();

  // Vérifie si le token est un objet vide
  if (Object.keys(token).length === 0) {
    router.navigate(['/auth/layoutLogin/login']); // Redirige vers la page de login
    return false; // Retourne false pour bloquer l'accès
  } else {
    return true; // Retourne true si le token n'est pas vide
  }
};
