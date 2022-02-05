import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RandomRotationDirective } from '../random-rotation.directive';
import { DobbleCardComponent } from '../dobble-card/dobble-card.component';
import { IonicModule } from '@ionic/angular';
import { GameOverComponent } from './game-over/game-over.component';

@NgModule({
  declarations: [RandomRotationDirective, DobbleCardComponent, GameOverComponent],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [
    DobbleCardComponent,
    RandomRotationDirective,
    GameOverComponent]
})
export class SharedModule { }
