import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    // Delete
    path: 'auth',
    loadComponent: () =>
      import('./layouts/auth/auth.page').then((m) => m.AuthPage),
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./pages/login/login.page').then((m) => m.LoginPage),
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./pages/register/register.page').then((m) => m.RegisterPage),
      },
    ],
  },

  {
    path: 'player',
    loadComponent: () =>
      import('./pages/player/player.page').then((m) => m.PlayerPage),
  },

  {
    path: '',
    loadChildren: () =>
      import('./shared/tabs/tabs.routes').then((m) => m.routes),
  },
];
