import { Component, OnInit } from '@angular/core';
import { generateSlug, RandomWordOptions, totalUniqueSlugs } from 'random-word-slugs';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.page.html',
  styleUrls: ['./setup.page.scss'],
})
export class SetupPage implements OnInit {
  selectedNumberOfSymbols = 6;
  validSymbols = [
    { label: '4 - Easy', value: 4 },
    { label: '6 - Medium', value: 6 },
    { label: '8 - Hard', value: 8 },
    { label: '12 - Extreme', value: 12 },
  ];
  deck: number[][] = [];
  options: RandomWordOptions<3> = {
    format: 'kebab',
    partsOfSpeech: ['noun', 'noun', 'noun'],
  };
  slug = '';

  ngOnInit(): void {
    this.generateSlug();
  }

  generateSlug() {
    this.slug = generateSlug(3, this.options);
    console.log(totalUniqueSlugs());
  }
}
