import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SolitairePageRoutingModule } from './solitaire-routing.module';

import { SolitairePage } from './solitaire.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    SolitairePageRoutingModule
  ],
  declarations: [SolitairePage]
})
export class SolitairePageModule { }
