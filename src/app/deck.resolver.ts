import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { DeckService } from './deck/deck.service';
import { DeckInfo } from './symbols';

@Injectable({
  providedIn: 'root'
})
export class DeckResolver implements Resolve<DeckInfo> {
  constructor(private deckService: DeckService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DeckInfo> {
    console.log(state.url);
    console.log(state.toString());

    const symbolsPerCard = +route.paramMap.get('symbolsPerCard');
    const slug = route.paramMap.get('slug') || '';
    const deck = this.deckService.buildDeck(symbolsPerCard, slug);

    // Shrink the deck if deckSize < 1
    const deckMultiplier = +route.paramMap.get('deckSize') || 1;
    const deckSize = Math.floor(deck.length * deckMultiplier);
    if (deckMultiplier < 1 && deckSize > 2) {
      // Trim the deck to the specified size
      deck.splice(deckSize - 1) ;
    }

    // Remove a card from the deck if it's not an even number
    if (deck.length % 2 !== 0) {
      deck.pop();
    }

    return of({
      symbolsPerCard,
      slug,
      deck
    });
  }
}
