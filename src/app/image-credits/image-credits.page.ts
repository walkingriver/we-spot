import { Component, signal } from '@angular/core';
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
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/angular/standalone';
import { CardSymbol, SYMBOLS } from '../symbols';

const pixabayUrl = 'https://pixabay.com/vectors/';

@Component({
  selector: 'app-image-credits',
  standalone: true,
  templateUrl: './image-credits.page.html',
  styleUrl: './image-credits.page.scss',
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
    IonGrid,
    IonRow,
    IonCol,
  ],
})
export class ImageCreditsPage {
  readonly allSymbols = signal<CardSymbol[]>(
    SYMBOLS.sort((a, b) => a.fileName.localeCompare(b.fileName)).map(
      (symbol) => ({
        fileName: symbol.fileName,
        referralUrl: `${pixabayUrl}${symbol.fileName.replace('.svg', '')}`,
      }),
    ),
  );

  openImageCredits(symbol: CardSymbol): void {
    window.open(symbol.referralUrl, '_blank');
  }
}
