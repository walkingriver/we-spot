import { Component, OnInit } from '@angular/core';
import {SYMBOLS} from '../symbols';

@Component({
  selector: 'app-image-credits',
  templateUrl: './image-credits.page.html',
  styleUrls: ['./image-credits.page.scss'],
})
export class ImageCreditsPage{
  allSymbols = SYMBOLS;
}
