import { Routes } from '@angular/router';
import { deckResolver } from '../deck.resolver';

export const SOLITAIRE_ROUTES: Routes = [
  {
    path: ':symbolsPerCard/:slug/:deckSize',
    loadComponent: () =>
      import('./solitaire.page').then((m) => m.SolitairePage),
    resolve: { deckInfo: deckResolver },
  },
  {
    path: ':symbolsPerCard/:slug',
    loadComponent: () =>
      import('./solitaire.page').then((m) => m.SolitairePage),
    resolve: { deckInfo: deckResolver },
  },
  {
    path: ':symbolsPerCard',
    loadComponent: () =>
      import('./solitaire.page').then((m) => m.SolitairePage),
    resolve: { deckInfo: deckResolver },
  },
];
