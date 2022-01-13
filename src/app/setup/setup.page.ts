import { Component, OnInit, ViewChild } from '@angular/core';
import { DeckService } from '../deck/deck.service';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.page.html',
  styleUrls: ['./setup.page.scss'],
})
export class SetupPage implements OnInit {
  selectedNumberOfSymbols = 12;
  validSymbols = [4, 6, 8, 12];
  deck: number[][] = [];


  constructor(private deckService: DeckService) {
  }

  ngOnInit() {
    this.onSymbolCountChanged();
  }

  onSymbolCountChanged() {
    this.deck = this.deckService.buildDeck(+this.selectedNumberOfSymbols);
  }
}
