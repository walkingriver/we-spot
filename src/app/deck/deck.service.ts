import { Injectable } from '@angular/core';
import { DobbleService } from '../dobble.service';
import { ShuffleService } from '../shuffle.service';
import { CardSymbol, Deck, SYMBOLS } from '../symbols';

@Injectable({
  providedIn: 'root'
})
export class DeckService {
  shuffledSymbols: CardSymbol[];

  constructor(
    private dobbleService: DobbleService,
    private shuffleService: ShuffleService) { }

  /**
   * Builds a deck of cards
   *
   * @param numberOfCards number of cards in the deck
   */
  buildDeck(numberOfCards: number, slug = ''): Deck {
    this.shuffleService.seed(slug);
    this.shuffledSymbols = this.shuffleService.shuffle(SYMBOLS);

    const rawCards = this.dobbleService.dobble(numberOfCards);

    const deck = rawCards.map(card =>
      this.buildCard(card));

    return this.shuffleService.shuffle(deck);
  }

  buildCard(symbols: number[]) {
    const card = symbols.map((cardNumber) => this.shuffledSymbols[cardNumber - 1]);

    return this.shuffleService.shuffle(card);
  }
}
