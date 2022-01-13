import { Injectable } from '@angular/core';
import { DobbleService } from '../dobble.service';
import { SymbolService } from '../symbol.service';

@Injectable({
  providedIn: 'root'
})
export class DeckService {
  constructor(
    private symbolService: SymbolService,
    private dobbleService: DobbleService
  ) { }

  /**
   * Builds a deck of cards
   *
   * @param numberOfCards number of cards in the deck
   */
  buildDeck(numberOfCards: number) {
    const rawCards = this.dobbleService.dobble(numberOfCards);

    const deck = rawCards.map(card =>
      this.symbolService.buildCard(card));

    return this.shuffle(deck);
  }

  private shuffle(elements: any[]) {
    return elements.sort(() => Math.random() - 0.5);
  }
}
