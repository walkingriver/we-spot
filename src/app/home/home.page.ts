import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { DeckService } from '../deck/deck.service';
import { DobbleCardComponent } from '../dobble-card/dobble-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterLink,
    DobbleCardComponent
  ],

  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  deck;
  currentCard;
  previousCard;

  constructor(private deckService: DeckService,
  ) {
    this.deck = this.deckService.buildDeck(6);
    this.currentCard = this.deck[1];
    this.previousCard = this.deck[0];
  }

}
