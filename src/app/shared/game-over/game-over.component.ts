import {
  Component,
  computed,
  effect,
  input,
  output,
  signal,
} from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonContent,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-game-over',
  standalone: true,
  templateUrl: './game-over.component.html',
  styleUrl: './game-over.component.scss',
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonIcon,
    IonContent,
  ],
})
export class GameOverComponent {
  readonly score = input(0);
  readonly deckSize = input(0);
  readonly game = input('');
  readonly symbols = input(0);
  readonly card = input<unknown[]>([]);
  readonly closed = output<void>();

  /** Current page URL for sharing (read in template). */
  readonly pageUrl = signal(
    typeof document !== 'undefined' ? document.location.href : '',
  );

  readonly shareText = computed(() => {
    return `I scored ${this.score()} points in We Spot! (${this.game()}),
 ${this.deckSize()}-card deck with ${this.symbols()} symbols per card.
🏁 Try to beat my score at `;
  });

  readonly shareButtons = computed(() => {
    const url = this.pageUrl();
    const text = this.shareText();
    const encUrl = encodeURIComponent(url);
    const encText = encodeURIComponent(text + url);
    return [
      {
        name: 'twitter',
        image: 'logo-twitter' as const,
        href: `https://twitter.com/intent/tweet?text=${encText}`,
      },
      {
        name: 'facebook',
        image: 'logo-facebook' as const,
        href: `https://www.facebook.com/sharer/sharer.php?u=${encUrl}`,
      },
      {
        name: 'pinterest',
        image: 'logo-pinterest' as const,
        href: `https://pinterest.com/pin/create/button/?url=${encUrl}&description=${encodeURIComponent(text)}`,
      },
      {
        name: 'linkedin',
        image: 'logo-linkedin' as const,
        href: `https://www.linkedin.com/sharing/share-offsite/?url=${encUrl}`,
      },
    ];
  });

  constructor() {
    effect(() => {
      const clip = `${this.shareText()}${this.pageUrl()}.`;
      if (navigator.clipboard?.writeText) {
        void navigator.clipboard.writeText(clip);
      }
    });
  }
}
