import { Component, OnInit } from '@angular/core';
import { DobbleService } from '../dobble.service';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.page.html',
  styleUrls: ['./setup.page.scss'],
})
export class SetupPage implements OnInit {
  selectedNumberOfSymbols = 4;
  validSymbols = [4, 6, 8, 12];
  deck: number[][] = [];

  constructor(private dobble: DobbleService) {
  }

  ngOnInit() {
    this.onSymbolCountChanged();
  }

  onSymbolCountChanged() {
    this.deck = this.dobble.dobble(+this.selectedNumberOfSymbols);
  }
}
