import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { DeckService } from './deck/deck.service';
import { DeckInfo } from './symbols';

export const deckResolver: ResolveFn<DeckInfo> = (route) => {
  const deckService = inject(DeckService);
  const symbolsPerCard = +route.paramMap.get('symbolsPerCard')!;
  const slug = route.paramMap.get('slug') || '';
  const deck = deckService.buildDeck(symbolsPerCard, slug);

  const deckSizeParam = route.paramMap.get('deckSize');
  const deckMultiplier =
    deckSizeParam != null && deckSizeParam !== '' ? +deckSizeParam : 1;
  const deckSize = Math.floor(deck.length * deckMultiplier);
  if (deckMultiplier < 1 && deckSize > 2) {
    deck.splice(deckSize - 1);
  }

  if (deck.length % 2 !== 0) {
    deck.pop();
  }

  return {
    symbolsPerCard,
    slug,
    deck,
  };
};
