import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card-table',
  templateUrl: './card-table.component.html',
  styleUrls: ['./card-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardTableComponent implements OnInit {
  @Input() cards = [];
  @Output() symbolSelected = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onSymbolClick(event) {
    this.symbolSelected.emit(event);
  }

}
