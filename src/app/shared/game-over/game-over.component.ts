import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import { Share } from '@capacitor/share';

@Component({
  selector: 'app-game-over',
  templateUrl: './game-over.component.html',
  styleUrls: ['./game-over.component.scss']
})
export class GameOverComponent implements OnInit {
  @Input() score = 0;
  @Input() deckSize = 0;
  @Input() game = '';
  @Input() symbols = 0;
  @Input() card = [];
  @Output() closed = new EventEmitter();
  gameUrl = document.location.href;
  shareText = '';

  // shareButtons = [
  //   { name: 'twitter', image: 'logo-twitter' },
  //   { name: 'facebook', image: 'logo-facebook' },
  //   { name: 'pinterest', image: 'logo-pinterest' },
  //   { name: 'linkedin', image: 'logo-linkedin' },
  // ];

  constructor(private clipboard: Clipboard) { }

  ngOnInit(): void {
    this.gameUrl = `https://we-spot.netlify.app/solitaire/${this.symbols}/${this.game}/${this.deckSize}`;
    this.shareText = `I scored ${this.score} points in We Spot! (${this.game},
 ${this.deckSize}-card deck with ${this.symbols} symbols per card).
🏁 Try to beat my score.`;
    // this.clipboard.copy(`${this.shareText}${this.gameUrl}.`);
    this.clipboard.copy(`${this.shareText}.`);
  }

  async share() {
    const canShare = await Share.canShare();
    if (canShare.value) {
      await Share.share({
        title: 'Share your We Spot! score',
        text: this.shareText,
        url: this.gameUrl,
        dialogTitle: 'Share your We Spot! score',
      });
    }
  }
}
