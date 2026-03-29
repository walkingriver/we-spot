import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
  IonButton,
  IonIcon,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardContent,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonSelect,
  IonSelectOption,
} from '@ionic/angular/standalone';
import { generateSlug, RandomWordOptions } from 'random-word-slugs';

@Component({
  selector: 'app-setup',
  standalone: true,
  templateUrl: './setup.page.html',
  styleUrl: './setup.page.scss',
  imports: [
    RouterLink,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    IonTitle,
    IonContent,
    IonButton,
    IonIcon,
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
    IonCardContent,
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    IonSelect,
    IonSelectOption,
  ],
})
export class SetupPage implements OnInit {
  readonly slug = signal('');
  readonly selectedNumberOfSymbols = signal(6);
  readonly selectedDeckSize = signal(1);

  readonly validSymbols = [
    { label: 'Easy - 13 cards, 4 symbols', value: 4 },
    { label: 'Medium - 31 cards, 6 symbols', value: 6 },
    { label: 'Hard - 57 cards, 8 symbols', value: 8 },
    { label: 'Extreme - 133 cards, 12 symbols', value: 12 },
  ];
  readonly deckSizes = [
    { label: 'Full Deck', value: 1 },
    { label: '3/4 Deck', value: 0.75 },
    { label: '1/2 Deck', value: 0.5 },
    { label: '1/3 Deck', value: 0.333 },
    { label: '1/4 Deck', value: 0.25 },
    { label: '1/5 Deck', value: 0.2 },
  ];

  ngOnInit(): void {
    this.slug.set(this.generateSlug());
  }

  onSlugInput(ev: Event): void {
    const v = (ev as CustomEvent<{ value?: string | null }>).detail?.value;
    this.slug.set(v != null ? String(v) : '');
  }

  onSymbolsChange(ev: Event): void {
    const v = (ev as CustomEvent<{ value: number }>).detail.value;
    this.selectedNumberOfSymbols.set(Number(v));
  }

  onDeckSizeChange(ev: Event): void {
    const v = (ev as CustomEvent<{ value: number }>).detail.value;
    this.selectedDeckSize.set(Number(v));
  }

  generateSlug(): string {
    const options: RandomWordOptions<3> = {
      format: 'kebab',
      partsOfSpeech: ['noun', 'noun', 'noun'],
    };
    return generateSlug(3, options);
  }
}
