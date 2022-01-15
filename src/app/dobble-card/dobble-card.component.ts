import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { SymbolService } from '../symbol.service';
import { CardSymbol } from '../symbols';

@Component({
  selector: 'app-dobble-card',
  templateUrl: './dobble-card.component.html',
  styleUrls: ['./dobble-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DobbleCardComponent implements OnInit {
  @Input() card: CardSymbol[] = [];
  @Output() symbolClick = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onSymbolClick(symbol: CardSymbol) {
    this.symbolClick.emit(symbol);
  }

}
