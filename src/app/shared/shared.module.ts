import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RandomRotationDirective } from '../random-rotation.directive';
import { DobbleCardComponent } from '../dobble-card/dobble-card.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [RandomRotationDirective, DobbleCardComponent],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [
    DobbleCardComponent,
    RandomRotationDirective]
})
export class SharedModule { }
