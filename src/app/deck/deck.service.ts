import { Injectable } from '@angular/core';
import { ShuffleService } from '../shuffle.service';
import { CardSymbol, Deck, SYMBOLS } from '../symbols';
import deckIndex from '../../assets/decks/index.json';

type DeckIndex = Record<string, number[][]>;

@Injectable({
  providedIn: 'root',
})
export class DeckService {
  shuffledSymbols: CardSymbol[] = [];

  constructor(private shuffleService: ShuffleService) {}

  /**
   * Builds a deck of cards using precomputed structures (see tools/deck-generator).
   *
   * @param numberOfCards symbols per card (must match generated JSON keys: 4, 6, 8, 12)
   */
  buildDeck(numberOfCards: number, slug = ''): Deck {
    this.shuffleService.seed(slug);
    this.shuffledSymbols = this.shuffleService.shuffle(SYMBOLS);

    const rawCards = this.cloneRawDeck(numberOfCards);
    const deck = rawCards.map((card) => this.buildCard(card));
    return this.shuffleService.shuffle(deck);
  }

  private cloneRawDeck(symbolsPerCard: number): number[][] {
    const key = String(symbolsPerCard);
    const raw = (deckIndex as DeckIndex)[key];
    if (!raw) {
      throw new Error(`No precomputed deck for symbolsPerCard=${symbolsPerCard}`);
    }
    return raw.map((row) => [...row]);
  }

  buildCard(symbols: number[]) {
    const card = symbols.map((cardNumber) => this.shuffledSymbols[cardNumber - 1]);
    return this.shuffleService.shuffle(card);
  }
}
