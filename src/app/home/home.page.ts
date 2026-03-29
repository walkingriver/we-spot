import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
  IonButton,
} from '@ionic/angular/standalone';
import { DeckService } from '../deck/deck.service';
import { DobbleCardComponent } from '../dobble-card/dobble-card.component';
import { CardSymbol } from '../symbols';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
  imports: [
    RouterLink,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    IonTitle,
    IonContent,
    IonButton,
    DobbleCardComponent,
  ],
})
export class HomePage {
  private readonly deckService = inject(DeckService);

  private readonly deck = signal(this.deckService.buildDeck(6));

  /** Sample cards on the home page (matches original deck[0] / deck[1] labels). */
  readonly previousCard = computed<CardSymbol[] | undefined>(
    () => this.deck()[0],
  );
  readonly currentCard = computed<CardSymbol[] | undefined>(
    () => this.deck()[1],
  );
}
