import { Component, OnInit } from '@angular/core';
import { generateSlug, RandomWordOptions } from 'random-word-slugs';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.page.html',
  styleUrls: ['./setup.page.scss'],
})
export class SetupPage implements OnInit {
  selectedNumberOfSymbols = 6;
  validSymbols = [
    { label: 'Easy - 13 cards, 4 symbols', value: 4 },
    { label: 'Medium - 31 cards, 6 symbols', value: 6 },
    { label: 'Hard - 57 cards, 8 symbols', value: 8 },
    { label: 'Extreme - 133 cards, 12 symbols', value: 12 },
  ];
  selectedDeckSize = 1;
  deckSizes = [
    { label: 'Full Deck', value: 1 },
    { label: '3/4 Deck', value: 0.75 },
    { label: '1/2 Deck', value: 0.50 },
    { label: '1/3 Deck', value: 0.333 },
    { label: '1/4 Deck', value: 0.25 },
    { label: '1/5 Deck', value: 0.20 },
  ];
  slug = '';

  ngOnInit(): void {
    this.slug = this.generateSlug();
  }

generateSlug() {
  const options: RandomWordOptions<3> = {
    format: 'kebab',
    partsOfSpeech: ['noun', 'noun', 'noun'],
  };
  const slug = generateSlug(3, options);
  return slug;
}
}
