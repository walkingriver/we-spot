import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
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
  deckSize = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private deckService: DeckService,
    private sounds: SoundService) { }

  ngOnInit() {
    this.symbolsPerCard = +this.route.snapshot.paramMap.get('symbolsPerCard');
    this.slug = this.route.snapshot.paramMap.get('slug') || '';

    this.deck = this.deckService.buildDeck(this.symbolsPerCard, this.slug);
    this.deckSize = +this.route.snapshot.queryParamMap.get('deckSize') || this.deck.length;

    this.confirmStart();
  }

  startGame() {
    // We'll deal from the end of the deck, so the first card is the last card in the deck.
    this.index = this.deckSize - 1;

    this.previousCard = this.deck[this.index];
    this.currentCard = this.deck[this.index - 1];
    console.log('currentCard: ' + JSON.stringify(this.currentCard));
    console.log('previousCard: ' + JSON.stringify(this.previousCard));

    this.sounds.play('start');
  }

  async confirmStart() {
    console.log('deckSize: ' + this.deckSize);

    const alert = await this.alertCtrl.create({
      header: 'Start Game',
      subHeader: this.slug || 'Random Unnamed Game',
      message: `You will be playing with ${this.deckSize} cards.`,
      buttons: [
        { text: 'Go to Setup', handler: () => this.goToSetup() },
        { text: 'Start Game', handler: () => this.startGame() }
      ]
    });
    await alert.present();
  }

  goToSetup() {
    this.router.navigate(['/setup']);
  }

  onSymbolClick(symbolClicked: CardSymbol) {
    console.log(symbolClicked);

    const matchingSymbol = this.previousCard.find(symbol => symbol.fileName === symbolClicked.fileName);

    if (matchingSymbol) {
      this.sounds.playSuccessSound();
      const cardScore = this.calculateScore();
      this.score += cardScore;
      this.dealCard(cardScore);
    } else {
      this.sounds.playFailureSound();
      this.incorrectSelections++;
    }
  }

  dealCard(cardScore: number) {
    this.previousCard = this.currentCard;
    this.index--;

    if (this.index <= 0) {
      this.currentCard = null;
      this.setGameOver();
    } else {
      this.toastCtrl.create({
        message: 'Card Score: ' + cardScore,
        position: 'top',
        animated: true,
        duration: 1500
      }).then(toast => toast.present());

      this.currentCard = this.deck[this.deck.indexOf(this.currentCard) - 1];
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
