import { Injectable } from '@angular/core';
import { SYMBOLS  } from './symbols';

@Injectable({
  providedIn: 'root'
})
export class SymbolService {
  shuffledSymbols = this.shuffleSymbols();

  constructor() { }


  buildCard(card: number[]) {
    return card.map( (cardNumber) => this.shuffledSymbols[cardNumber - 1]);
  }

  private shuffleSymbols() {
    return SYMBOLS.sort(() => Math.random() - 0.5);
  }

}
