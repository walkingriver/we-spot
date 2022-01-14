import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SolitairePageRoutingModule } from './solitaire-routing.module';

import { SolitairePage } from './solitaire.page';
import { DobbleCardComponent } from '../dobble-card/dobble-card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SolitairePageRoutingModule
  ],
  declarations: [SolitairePage, DobbleCardComponent]
})
export class SolitairePageModule { }
