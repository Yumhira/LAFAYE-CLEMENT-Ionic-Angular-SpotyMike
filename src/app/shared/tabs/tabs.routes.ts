import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('../../pages/home/home.page').then((m) => m.HomePage),
      },
      {
        path: 'like',
        loadComponent: () =>
          import('../../pages/like/like.page').then((m) => m.LikePage),
      },
      {
        path: 'playlist',
        loadComponent: () =>
          import('../../pages/playlist/playlist.page').then(
            (m) => m.PlaylistPage
          ),
      },

      {
        path: 'account-head',
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
