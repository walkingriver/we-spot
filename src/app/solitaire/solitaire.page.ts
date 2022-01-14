import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { DeckService } from '../deck/deck.service';
import { CardSymbol } from '../symbols';

@Component({
  selector: 'app-solitaire',
  templateUrl: './solitaire.page.html',
  styleUrls: ['./solitaire.page.scss'],
})
export class SolitairePage implements OnInit {
  deck: CardSymbol[][];
  currentCard: CardSymbol[];
  previousCard: CardSymbol[];

  constructor(
    private route: ActivatedRoute,
    private deckService: DeckService) { }

  ngOnInit() {
    const symbolsPerCard = +this.route.snapshot.paramMap.get('symbolsPerCard');
    this.deck = this.deckService.buildDeck(symbolsPerCard);
    this.currentCard = this.deck[1];
    this.previousCard = this.deck[0];
  }

}
