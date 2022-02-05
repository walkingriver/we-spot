import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonRouterOutlet, ToastController } from '@ionic/angular';
import { DeckService } from '../deck/deck.service';
import { SoundService } from '../sound.service';
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
  startTime = new Date();
  symbolsPerCard: number;
  slug: string;
  gameOver = false;
  showGameOver = false;
  incorrectSelections = 0;

  constructor(
    private route: ActivatedRoute,
    private toastCtrl: ToastController,
    private deckService: DeckService,
    private sounds: SoundService) { }

  ngOnInit() {
    this.symbolsPerCard = +this.route.snapshot.paramMap.get('symbolsPerCard');
    this.slug = this.route.snapshot.paramMap.get('slug') || '';

    this.deck = this.deckService.buildDeck(this.symbolsPerCard, this.slug);

    // Uncomment this line when debugging to get to the
    // end of the deck quickly without playing the whole game.
    // this.index = this.deck.length - 2;

    this.currentCard = this.deck[1];
    this.previousCard = this.deck[0];

    this.sounds.play('start');
  }

  onSymbolClick(symbolClicked: CardSymbol) {
    console.log(symbolClicked);

    const matchingSymbol = this.previousCard.find(symbol => symbol.fileName === symbolClicked.fileName);

    if (matchingSymbol) {
      this.sounds.playSuccessSound();
      this.score += this.calculateScore();
      this.advanceCard();
    } else {
      this.sounds.playFailureSound();
      this.incorrectSelections++;
    }
  }

  advanceCard() {
    this.previousCard = this.currentCard;

    if (this.index >= this.deck.length - 1) {
      this.currentCard = null;
      this.setGameOver();
    } else {
      this.toastCtrl.create({
        message: 'Card Score: ' + this.score,
        position: 'top',
        duration: 1500
      }).then(toast => toast.present());

      this.currentCard = this.deck[this.deck.indexOf(this.currentCard) + 1];
      this.index++;
      this.startTime = new Date();
    }
  }

  setGameOver() {
    this.gameOver = true;
    this.showGameOver = true;
    this.sounds.play('game-over');
    console.log('Game over, score: ' + this.score);
    console.log(`Game over, game URL: /${this.symbolsPerCard}/${this.slug}`);
  }

  /**
   * Determines the score based on elapsed time on this card.
   * The score for the card is the number of seconds equal to
   * the number of symbols on the card, less the elapsed time in
   * milliseconds.
   *
   * Minimum score for a card is 50.
   */
  calculateScore() {
    const timeElapsed = new Date().getTime() - this.startTime.getTime();
    const maxScore = 1000 * this.symbolsPerCard - 500 * this.incorrectSelections - timeElapsed;
    const score = Math.max(50, maxScore);

    return score;
  }
}
