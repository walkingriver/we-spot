import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'setup',
    loadComponent: () => import('./setup/setup.page').then((m) => m.SetupPage),
  },
  {
    path: 'solitaire',
    loadChildren: () =>
      import('./solitaire/solitaire.routes').then((m) => m.SOLITAIRE_ROUTES),
  },
  {
    path: 'image-credits',
    loadComponent: () =>
      import('./image-credits/image-credits.page').then((m) => m.ImageCreditsPage),
  },
];
