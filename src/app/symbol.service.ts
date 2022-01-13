import { Injectable } from '@angular/core';
import { SYMBOLS } from './symbols';

@Injectable({
  providedIn: 'root'
})
export class SymbolService {
  shuffledSymbols = this.shuffle(SYMBOLS);

  constructor() { }

  buildCard(card: number[]) {
    card = card.map((cardNumber) => this.shuffledSymbols[cardNumber - 1]);

    return this.shuffle(card);
  }


  private shuffle(elements: any[]) {
    return elements.sort(() => Math.random() - 0.5);
  }
}
