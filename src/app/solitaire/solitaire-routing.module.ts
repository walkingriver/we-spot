import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SolitairePage } from './solitaire.page';

const routes: Routes = [
  {
    path: ':symbolsPerCard',
    component: SolitairePage
  },
  {
    path: ':symbolsPerCard/:slug',
    component: SolitairePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SolitairePageRoutingModule {}
