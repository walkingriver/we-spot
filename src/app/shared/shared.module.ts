import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RandomRotationDirective } from '../random-rotation.directive';
import { DobbleCardComponent } from '../dobble-card/dobble-card.component';
import { IonicModule } from '@ionic/angular';
import { ShareModule } from 'ngx-sharebuttons';
import { GameOverComponent } from './game-over/game-over.component';

@NgModule({
  declarations: [
    GameOverComponent,
    DobbleCardComponent,
    RandomRotationDirective,
  ],
  imports: [
    CommonModule,
    IonicModule,
    ShareModule,
  ],
  exports: [
    DobbleCardComponent,
    GameOverComponent,
    RandomRotationDirective,
  ]
})
export class SharedModule { }
