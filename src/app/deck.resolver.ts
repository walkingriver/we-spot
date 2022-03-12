import { Injectable } from '@angular/core';
import {
  Router, Resolve,
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

    return of({
      symbolsPerCard,
      slug,
      deck
    });
  }
}
