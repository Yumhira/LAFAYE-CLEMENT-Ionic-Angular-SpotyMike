import { Routes } from '@angular/router';
import { authGuard } from './core/guard/auth.guard';

export const routes: Routes = [
  {
    path: 'auth',
    children: [
      {
        path: 'layoutLogin',
        loadComponent: () =>
          import('./layouts/auth/auth.page').then((m) => m.AuthPage),
        children: [
          {
            path: 'login',
            loadComponent: () =>
              import('./pages/login/login.page').then((m) => m.LoginPage)
          }
        ]
      }
      ,
      {
        path: 'layoutRegister',
        loadComponent: () =>
          import('./layouts/register/register.page').then((m) => m.RegisterLayoutPage),
        children: [
          {
            path: 'register',
            loadComponent: () =>
              import('./pages/register/register.page').then((m) => m.RegisterPage),
          },
        ],
      }
    ]
  },

  {
    path: 'player',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/player/player.page').then((m) => m.PlayerPage),
  },

  {
    path: 'listmusic',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/listmusic/listmusic.page').then((m) => m.ListPage),
  },

  {
    path: 'listgenres',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/listgenres/listgenres.page').then((m) => m.ListGenresPage),
  },

  {
    path: 'album',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/album/album.page').then((m) => m.AlbumPage),
  },

  {
    path: 'artist',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/artist/artist.page').then((m) => m.ArtistPage),
  },

  {
    path: '',
    loadChildren: () =>
      import('./shared/tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'search',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/search/search.page').then( m => m.SearchPage)
  },

];
