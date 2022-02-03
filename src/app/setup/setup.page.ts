import { Component, OnInit } from '@angular/core';
import { generateSlug } from 'random-word-slugs';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.page.html',
  styleUrls: ['./setup.page.scss'],
})
export class SetupPage {
  selectedNumberOfSymbols = 6;
  validSymbols = [
    { label: '4 - Easy', value: 4 },
    { label: '6 - Medium', value: 6 },
    { label: '8 - Hard', value: 8 },
    { label: '12 - Extreme', value: 12 },
  ];
  deck: number[][] = [];
  slug = generateSlug();
}
