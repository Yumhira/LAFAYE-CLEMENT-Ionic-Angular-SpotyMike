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
    path: 'listmusic',
    loadComponent: () =>
      import('./pages/listmusic/listmusic.page').then((m) => m.ListPage),
  },

  {
    path: 'listgenres',
    loadComponent: () =>
      import('./pages/listgenres/listgenres.page').then((m) => m.ListGenresPage),
  },

  {
    path: 'album',
    loadComponent: () =>
      import('./pages/album/album.page').then((m) => m.AlbumPage),
  },

  {
    path: 'artist',
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
    loadComponent: () => import('./pages/search/search.page').then( m => m.SearchPage)
  },


];
