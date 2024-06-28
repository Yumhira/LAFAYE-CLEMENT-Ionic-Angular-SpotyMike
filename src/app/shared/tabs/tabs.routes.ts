import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { authGuard } from 'src/app/core/guard/auth.guard';

export const routes: Routes = [
  {
    path: 'tabs',
    canActivate: [authGuard],
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('../../pages/home/home.page').then((m) => m.HomePage),
        canActivate: [authGuard],
      },
      {
        path: 'like',
        loadComponent: () =>
          import('../../pages/like/like.page').then((m) => m.LikePage),
        canActivate: [authGuard],
      },
      {
        path: 'playlist',
        loadComponent: () =>
          import('../../pages/playlist/playlist.page').then(
            (m) => m.PlaylistPage
          ),
          canActivate: [authGuard],
      },

      {
        path: 'account-head',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./../../layouts/account-head/account-head.page').then(
            (m) => m.AccountHeadPage
          ),
        children: [
          {
            path: 'account',
            loadComponent: () =>
              import('../../pages/account/account.page').then(
                (m) => m.AccountPage
              ),
            canActivate: [authGuard],
          },
        ],
      },

      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full',
  },
];
