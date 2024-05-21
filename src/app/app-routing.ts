import { Routes } from '@angular/router';
import { DeckResolver } from './deck.resolver';

const solitairePage = () => import('./solitaire/solitaire.page').then(m => m.SolitairePage);
const setupPage = () => import('./setup/setup.page').then(m => m.SetupPage);
const homePage = () => import('./home/home.page').then(m => m.HomePage);

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: homePage
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'setup',
    loadComponent: setupPage
  },
  {
    path: 'solitaire/:symbolsPerCard',
    loadComponent: solitairePage,
    resolve: { deckInfo: DeckResolver }
  },
  {
    path: 'solitaire/:symbolsPerCard/:slug',
    loadComponent: solitairePage,
    resolve: { deckInfo: DeckResolver }
  },
  {
    path: 'solitaire/:symbolsPerCard/:slug/:deckSize',
    loadComponent: solitairePage,
    resolve: { deckInfo: DeckResolver }
  },
  {
    path: 'image-credits',
    loadComponent: () => import('./image-credits/image-credits.page')
      .then(m => m.ImageCreditsPage)
  },
];
