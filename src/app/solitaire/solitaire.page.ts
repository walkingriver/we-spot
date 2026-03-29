import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {
  AlertController,
  ToastController,
  Animation,
} from '@ionic/angular';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonMenuButton,
  IonTitle,
  IonContent,
  IonButton,
  IonIcon,
  IonModal,
  IonFooter,
  IonLabel,
  IonFab,
  IonFabButton,
} from '@ionic/angular/standalone';
import { SoundService } from '../sound.service';
import { CardSymbol, DeckInfo, PlayingCard } from '../symbols';
import { AnimationService } from '../animation.service';
import { DobbleCardComponent } from '../dobble-card/dobble-card.component';
import { GameOverComponent } from '../shared/game-over/game-over.component';

@Component({
  selector: 'app-solitaire',
  standalone: true,
  templateUrl: './solitaire.page.html',
  styleUrl: './solitaire.page.scss',
  imports: [
    RouterLink,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonMenuButton,
    IonTitle,
    IonContent,
    IonButton,
    IonIcon,
    IonModal,
    IonFooter,
    IonLabel,
    IonFab,
    IonFabButton,
    DobbleCardComponent,
    GameOverComponent,
  ],
})
export class SolitairePage implements OnInit {
  private readonly animations = inject(AnimationService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly alertCtrl = inject(AlertController);
  private readonly toastCtrl = inject(ToastController);
  private readonly sounds = inject(SoundService);

  readonly deckInfo = signal<DeckInfo | undefined>(undefined);
  readonly currentCard = signal<PlayingCard | null>(null);
  readonly previousCard = signal<PlayingCard | null>(null);
  readonly score = signal(0);
  readonly index = signal(1);
  readonly startTime = signal(new Date());
  readonly gameOver = signal(false);
  readonly showGameOver = signal(false);
  readonly incorrectSelections = signal(0);
  readonly deckSize = signal(0);

  private enterAnimation!: Animation;
  private exitAnimation!: Animation;

  ngOnInit(): void {
    const info = this.route.snapshot.data['deckInfo'] as DeckInfo;
    this.deckInfo.set(info);
    this.deckSize.set(info.deck.length);

    this.configureAnimations();
    void this.confirmStart();
  }

  configureAnimations(): void {
    this.enterAnimation = this.animations.getEastWestEnterAnimation(
      '#previous-card',
      '#current-card',
    );
    this.exitAnimation = this.animations.getEastWestExitAnimation(
      '#previous-card',
      '#current-card',
    );
  }

  startGame(): void {
    const info = this.deckInfo();
    if (!info) {
      return;
    }
    const size = this.deckSize();
    this.index.set(size - 1);

    const idx = this.index();
    this.previousCard.set({
      id: 'previous-card',
      symbols: info.deck[idx],
    });
    this.currentCard.set({
      id: 'current-card',
      symbols: info.deck[idx - 1],
    });
    void this.sounds.play('start');
    this.startTime.set(new Date());
  }

  async confirmStart(): Promise<void> {
    const info = this.deckInfo();
    if (!info) {
      return;
    }
    const alert = await this.alertCtrl.create({
      header: 'Start Game',
      subHeader: info.slug || 'Random Unnamed Game',
      message: `You will be playing with ${this.deckSize()} cards.`,
      backdropDismiss: false,
      buttons: [
        { text: 'Go to Setup', handler: () => this.goToSetup() },
        { text: 'Start Game', handler: () => this.startGame() },
      ],
    });
    await alert.present();
  }

  goToSetup(): void {
    void this.router.navigate(['/setup']);
  }

  onModalDismissed(): void {
    this.showGameOver.set(false);
  }

  onGameOverClosed(): void {
    this.showGameOver.set(false);
  }

  openShareModal(): void {
    this.showGameOver.set(true);
  }

  async onSymbolClick(symbolClicked: CardSymbol): Promise<void> {
    const cur = this.currentCard();
    const prev = this.previousCard();
    if (!cur || !prev) {
      return;
    }

    const allSymbols = cur.symbols.concat(prev.symbols);

    const matchingSymbol = allSymbols.filter(
      (symbol) => symbol.fileName === symbolClicked.fileName,
    );

    if (matchingSymbol.length > 1) {
      await this.playCorrectAnimation(symbolClicked);
      void this.sounds.playSuccessSound();
      const cardScore = this.calculateScore();
      this.score.update((s) => s + cardScore);
      await this.showCardScore(cardScore);
      await this.dealCard();
    } else {
      await this.playIncorrectAnimation(symbolClicked);
      void this.sounds.playFailureSound();
      this.incorrectSelections.update((n) => n + 1);
    }
  }

  async playCorrectAnimation(symbolClicked: CardSymbol): Promise<void> {
    const animation = this.animations.getCorrectAnimation(
      `[title='${symbolClicked.fileName}']`,
    );
    await animation.play();
  }

  async playIncorrectAnimation(symbolClicked: CardSymbol): Promise<void> {
    const animation = this.animations.getIncorrectAnimation(
      `[title='${symbolClicked.fileName}']`,
    );
    await animation.play();
  }

  async dealCard(): Promise<void> {
    const info = this.deckInfo();
    if (!info) {
      return;
    }

    await this.exitAnimation.play();
    this.previousCard.set(this.currentCard());
    const prev = this.previousCard();
    if (prev) {
      prev.id = 'previous-card';
    }
    this.index.update((i) => i - 1);
    this.exitAnimation.stop();

    const nextIndex = this.index();
    if (nextIndex <= 0) {
      this.currentCard.set(null);
      this.setGameOver();
    } else {
      this.currentCard.set({
        id: '#current-card',
        symbols: info.deck[nextIndex - 1],
      });
      await this.enterAnimation.play();
      this.enterAnimation.stop();
      this.startTime.set(new Date());
    }
  }

  async showCardScore(cardScore: number): Promise<void> {
    const toast = await this.toastCtrl.create({
      message: 'Card Score: ' + cardScore,
      position: 'top',
      animated: true,
      duration: 1500,
    });

    await toast.present();
  }

  setGameOver(): void {
    this.gameOver.set(true);
    this.showGameOver.set(true);
    void this.sounds.play('game-over');
  }

  calculateScore(): number {
    const info = this.deckInfo();
    if (!info) {
      return 0;
    }
    const timeElapsed = new Date().getTime() - this.startTime().getTime();
    const maxScore =
      1000 * info.symbolsPerCard -
      500 * this.incorrectSelections() -
      timeElapsed;
    return Math.max(50, maxScore);
  }
}
