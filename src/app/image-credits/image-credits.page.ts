import { Component, OnInit } from '@angular/core';
import { CardSymbol, SYMBOLS } from '../symbols';

const pixabayUrl = 'https://pixabay.com/vectors/';

@Component({
  selector: 'app-image-credits',
  templateUrl: './image-credits.page.html',
  styleUrls: ['./image-credits.page.scss'],
})
export class ImageCreditsPage {
  allSymbols: CardSymbol[] = [];

  constructor() {
    this.allSymbols = SYMBOLS
      .sort((a, b) => a.fileName.localeCompare(b.fileName))
      .map(symbol => ({
        fileName: symbol.fileName,
        referralUrl: `${pixabayUrl}${(symbol.fileName).replace('.svg', '')}`,
      }));

    console.table(this.allSymbols);
  }

  openImageCredits(symbol) {
    window.open(symbol.referralUrl, '_blank');
  }
}
