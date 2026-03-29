import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { IonCard, IonCardContent } from '@ionic/angular/standalone';
import { CardSymbol } from '../symbols';
import { RandomRotationDirective } from '../random-rotation.directive';
import { ThrottledClickDirective } from '../throttled-click.directive';

@Component({
  selector: 'app-dobble-card',
  standalone: true,
  templateUrl: './dobble-card.component.html',
  styleUrl: './dobble-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonCard,
    IonCardContent,
    RandomRotationDirective,
    ThrottledClickDirective,
  ],
})
export class DobbleCardComponent {
  readonly card = input<CardSymbol[]>([]);
  readonly title = input('Card');
  readonly symbolClick = output<CardSymbol>();

  onSymbolClick(symbol: CardSymbol): void {
    this.symbolClick.emit(symbol);
  }
}
