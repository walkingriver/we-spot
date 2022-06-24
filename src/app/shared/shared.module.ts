import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RandomRotationDirective } from '../random-rotation.directive';
import { DobbleCardComponent } from '../dobble-card/dobble-card.component';
import { IonicModule } from '@ionic/angular';
import { ShareModule } from 'ngx-sharebuttons';
import { GameOverComponent } from './game-over/game-over.component';
import { ThrottledClickDirective } from '../throttled-click.directive';

@NgModule({
  declarations: [
    GameOverComponent,
    DobbleCardComponent,
    RandomRotationDirective,
    ThrottledClickDirective,
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
    ThrottledClickDirective,
  ]
})
export class SharedModule { }
