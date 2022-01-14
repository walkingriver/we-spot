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
  score = 0;
  index = 1;

  constructor(
    private route: ActivatedRoute,
    private deckService: DeckService) { }

  ngOnInit() {
    const symbolsPerCard = +this.route.snapshot.paramMap.get('symbolsPerCard');
    this.deck = this.deckService.buildDeck(symbolsPerCard);
    this.currentCard = this.deck[1];
    this.previousCard = this.deck[0];
  }

  onSymbolClick(symbolClicked: CardSymbol) {
    console.log(symbolClicked);

    const matchingSymbol = this.previousCard.find(symbol => symbol.fileName === symbolClicked.fileName);

    if (matchingSymbol) {
      this.score++;
    }

    this.previousCard = this.currentCard;
    this.currentCard = this.deck[this.deck.indexOf(this.currentCard) + 1];
    this.index++;

    if (this.currentCard === undefined) {
     // Game over!
    }
  }
}
