import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SetupPageRoutingModule } from './setup-routing.module';

import { SetupPage } from './setup.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SetupPageRoutingModule
  ],
  declarations: [SetupPage]
})
export class SetupPageModule {}
