import { Component, OnInit } from '@angular/core';
import { generateSlug } from 'random-word-slugs';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.page.html',
  styleUrls: ['./setup.page.scss'],
})
export class SetupPage {
  selectedNumberOfSymbols = 12;
  validSymbols = [4, 6, 8, 12];
  deck: number[][] = [];
  slug = generateSlug();
}
