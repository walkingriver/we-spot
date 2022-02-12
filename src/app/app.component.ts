import { Component } from '@angular/core';
import packageJson from '../../package.json';
import { SoundService } from './sound.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'New Game', url: '/setup', icon: 'play' },
    { title: 'Image Credits', url: '/image-credits', icon: 'images' },
    // { title: 'Privacy Policy', url: '/privacy', icon: 'eye' },
    // { title: 'Terms & Conditions', url: '/terms', icon: 'book' }
  ];

  isEnabled = this.sounds.enabled.asObservable();

  public appVersion: string = packageJson.version;
  constructor(public sounds: SoundService) {}
}
