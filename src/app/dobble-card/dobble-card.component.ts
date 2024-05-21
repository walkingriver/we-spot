import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RandomRotationDirective } from '../random-rotation.directive';
import { CardSymbol } from '../symbols';
import { ThrottledClickDirective } from '../throttled-click.directive';

@Component({
  selector: 'app-dobble-card',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    RandomRotationDirective,
    ThrottledClickDirective
  ],
  templateUrl: './dobble-card.component.html',
  styleUrls: ['./dobble-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DobbleCardComponent {
  @Input() card: CardSymbol[] = [];
  @Input() title = 'Card';
  @Output() symbolClick = new EventEmitter();

  cardGrid = [];

  onSymbolClick(symbol: CardSymbol) {
    this.symbolClick.emit(symbol);
  }

  splitArray(arr, rows) {
    const itemsPerRow = Math.ceil(arr.length / rows);
    return arr.reduce((acc, val, ind) => {
      const currentRow = Math.floor(ind / itemsPerRow);
      if (!acc[currentRow]) {
        acc[currentRow] = [val];
      } else {
        acc[currentRow].push(val);
      };
      return acc;
    }, []);
  };
}
