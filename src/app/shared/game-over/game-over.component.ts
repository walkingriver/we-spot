import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import { Share } from '@capacitor/share';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DeckInfo } from 'src/app/symbols';

@Component({
  selector: 'app-game-over',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  templateUrl: './game-over.component.html',
  styleUrls: ['./game-over.component.scss']
})
export class GameOverComponent implements OnInit {
  @Input() score = 0;
  @Input() deckSize = 0;
  @Input() game = '';
  @Input() cards = 0;
  @Input() symbols = 0;
  @Input() deckInfo: DeckInfo;
  @Output() closed = new EventEmitter();
  gameUrl = document.location.href;
  shareText = '';
  cardsToShare = [];
  symbolsToShare = '';

  private clipboard = inject(Clipboard);

  ngOnInit(): void {
    this.cardsToShare = this.deckInfo.deck.slice(0, this.cards);
    this.symbolsToShare = this.cardsToShare.flat().join('');
    console.log('symbolsToShare', this.symbolsToShare);

    this.gameUrl = `https://we-spot.netlify.app/solitaire/${this.symbols}/${this.game}/${this.deckSize}`;
    this.shareText = `We Spot!
    Spot the common symbols on each card.
    ${this.cardsToShare[0].join('')}
    ${this.cardsToShare[1].join('')}
    I scored ${this.score} points!
    Try to beat my score.`;

    this.clipboard.copy(`${this.shareText}`);
  }

  async share() {
    const canShare = await Share.canShare();
    if (canShare.value) {
      await Share.share({
        title: 'Share your We Spot! score',
        text: this.shareText,
        url: this.gameUrl,
        dialogTitle: 'Share your We Spot! score',
      });
    }
  }
}
