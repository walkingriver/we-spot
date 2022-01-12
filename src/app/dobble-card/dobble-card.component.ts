import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { SymbolService } from '../symbol.service';

@Component({
  selector: 'app-dobble-card',
  templateUrl: './dobble-card.component.html',
  styleUrls: ['./dobble-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DobbleCardComponent implements OnInit {
  @Input() card: number[] = [];
  constructor(public symbolService: SymbolService) { }

  ngOnInit(): void {
  }

}
