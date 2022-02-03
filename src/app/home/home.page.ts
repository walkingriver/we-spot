import { Component } from '@angular/core';
import { DeckService } from '../deck/deck.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  deck;
  currentCard;
  previousCard;

  constructor(private deckService: DeckService,
  ) {
    this.deck = this.deckService.buildDeck(4);
    this.currentCard = this.deck[1];
    this.previousCard = this.deck[0];
  }

}
