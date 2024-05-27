import { Routes } from '@angular/router';
import { TabsPage } from './tabs/tabs.page';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then((m) => m.LoginPage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage),
      },
      {
        path: 'like',
        loadComponent: () => import('./pages/like/like.page').then((m) => m.LikePage),
      },
      {
        path: 'playlist',
        loadComponent: () =>
          import('./pages/playlist/playlist.page').then((m) => m.PlaylistPage),
      },
      {
        path: 'account',
        loadComponent: () =>
          import('./pages/account/account.page').then((m) => m.AccountPage),
      },
    ],
  }
];
