import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-game-over',
  templateUrl: './game-over.component.html',
  styleUrls: ['./game-over.component.scss']
})
export class GameOverComponent implements OnInit {
  @Input() score = 0;
  @Input() game = '';
  @Input() symbols = 0;
  @Input() card = [];
  @Output() closed = new EventEmitter();
  gameUrl = document.location.href;
  shareText = '';

  constructor() { }

  ngOnInit(): void {
    this.shareText = `I scored ${this.score} points in SpyDuh (${this.game}
    with ${this.symbols} symbols per card). Try to beat my score at ${this.gameUrl}.`;
  }

}
