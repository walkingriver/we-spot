import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { SoundService } from '../sound.service';
import { CardSymbol, DeckInfo, PlayingCard } from '../symbols';
import { Animation } from '@ionic/angular';
import { AnimationService } from '../animation.service';

@Component({
  selector: 'app-solitaire',
  templateUrl: './solitaire.page.html',
  styleUrls: ['./solitaire.page.scss'],
})
export class SolitairePage implements OnInit {
  deckInfo: DeckInfo;
  currentCard: PlayingCard;
  previousCard: PlayingCard;
  score = 0;
  index = 1;
  startTime = new Date();
  gameOver = false;
  showGameOver = false;
  incorrectSelections = 0;
  deckSize = 0;
  enterAnimation: Animation;
  exitAnimation: Animation;

  constructor(
    private animations: AnimationService,
    private route: ActivatedRoute,
    private router: Router,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private sounds: SoundService) { }

  ngOnInit() {
    this.deckInfo = this.route.snapshot.data.deckInfo;
    this.deckSize = this.deckInfo.deck.length;

    this.configureAnimations();
    this.confirmStart();
  }

  configureAnimations() {
    this.enterAnimation = this.animations
      .getEastWestEnterAnimation('#previous-card', '#current-card');
    this.exitAnimation = this.animations
      .getEastWestExitAnimation('#previous-card', '#current-card');
  }

  startGame() {
    // We'll deal from the end of the deck, so the first card is the last card in the deck.
    this.index = this.deckSize - 1;

    this.previousCard = { id: 'previous-card', symbols: this.deckInfo.deck[this.index] };
    this.currentCard = { id: 'current-card', symbols: this.deckInfo.deck[this.index - 1] };
    console.log('currentCard: ' + JSON.stringify(this.currentCard));
    console.log('previousCard: ' + JSON.stringify(this.previousCard));

    this.sounds.play('start');
    this.startTime = new Date();
  }

  async confirmStart() {
    console.log('deckSize: ' + this.deckSize);

    const alert = await this.alertCtrl.create({
      header: 'Start Game',
      subHeader: this.deckInfo.slug || 'Random Unnamed Game',
      message: `You will be playing with ${this.deckSize} cards.`,
      backdropDismiss: false,
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

  async onSymbolClick(symbolClicked: CardSymbol) {
    console.log(symbolClicked);

    const allSymbols = this.currentCard.symbols.concat(this.previousCard.symbols);

    const matchingSymbol = allSymbols.filter(symbol => symbol.fileName === symbolClicked.fileName);

    if (matchingSymbol?.length > 1) {
      await this.playCorrectAnimation(symbolClicked);
      this.sounds.playSuccessSound();
      const cardScore = this.calculateScore();
      this.score += cardScore;
      await this.showCardScore(cardScore);
      await this.dealCard();
    } else {
      this.playIncorrectAnimation(symbolClicked);
      this.sounds.playFailureSound();
      this.incorrectSelections++;
    }
  }

  async playCorrectAnimation(symbolClicked: CardSymbol) {
    const animation = this.animations
      .getCorrectAnimation(`[title='${symbolClicked.fileName}']`);
    await animation.play();
  }

  async playIncorrectAnimation(symbolClicked: CardSymbol) {
    const animation = this.animations
      .getIncorrectAnimation(`[title='${symbolClicked.fileName}']`);
    await animation.play();
  }

  async dealCard() {
    await this.exitAnimation.play();
    this.previousCard = this.currentCard;
    this.previousCard.id = 'previous-card';
    this.index--;
    this.exitAnimation.stop();

    if (this.index <= 0) {
      this.currentCard = null;
      this.setGameOver();
    } else {

      // Check to see if there are any cards left (not shown)
      this.currentCard = {
        id: '#current-card',
        symbols: this.deckInfo.deck[this.index - 1]
      };
      await this.enterAnimation.play();
      this.enterAnimation.stop();
      this.startTime = new Date();
    }
  }

  async showCardScore(score) {
    const toast = await this.toastCtrl.create({
      message: 'Card Score: ' + score,
      position: 'top',
      animated: true,
      duration: 1500
    });

    await toast.present();
  }

  setGameOver() {
    this.gameOver = true;
    this.showGameOver = true;
    this.sounds.play('game-over');
    console.log('Game over, score: ' + this.score);
    console.log(`Game over, game URL: /${this.deckInfo.symbolsPerCard}/${this.deckInfo.slug}`);
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
    const timeElapsed = new Date().getTime()
      - this.startTime.getTime();
    const maxScore = 1000 * this.deckInfo.symbolsPerCard
      - 500 * this.incorrectSelections
      - timeElapsed;
    const score = Math.max(50, maxScore);

    return score;
  }
}
