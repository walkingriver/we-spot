import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-dobble-card',
  templateUrl: './dobble-card.component.html',
  styleUrls: ['./dobble-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DobbleCardComponent implements OnInit {
  @Input() symbols: number[] = [];
  constructor() { }

  ngOnInit(): void {
  }

}
