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
    path: 'home',
    loadComponent: () =>
      import('./shared/tabs/tabs.page').then((m) => m.TabsPage),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth/login',
  },
];