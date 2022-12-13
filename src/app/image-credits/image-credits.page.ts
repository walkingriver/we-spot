import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { SYMBOLS } from '../symbols';


@Component({
  selector: 'app-image-credits',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    RouterLink
  ],
  templateUrl: './image-credits.page.html',
  styleUrls: ['./image-credits.page.scss'],
})
export class ImageCreditsPage {
  allSymbols: string[] = [];

  constructor() {
    this.allSymbols = SYMBOLS
      .sort((a, b) => a.localeCompare(b));

    console.table(this.allSymbols);
  }
}
