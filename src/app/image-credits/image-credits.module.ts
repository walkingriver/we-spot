import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImageCreditsPageRoutingModule } from './image-credits-routing.module';

import { ImageCreditsPage } from './image-credits.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImageCreditsPageRoutingModule
  ],
  declarations: [ImageCreditsPage]
})
export class ImageCreditsPageModule {}
