import { CommonModule } from '@angular/common';
import { Component, EnvironmentInjector } from '@angular/core';
import { RouteReuseStrategy, RouterLink } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import packageJson from '../../package.json';
import { SoundService } from './sound.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    RouterLink
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'New Game', url: '/setup', icon: 'play' },
    // { title: 'Image Credits', url: '/image-credits', icon: 'images' },
    // { title: 'Privacy Policy', url: '/privacy', icon: 'eye' },
    // { title: 'Terms & Conditions', url: '/terms', icon: 'book' }
  ];

  isEnabled = this.sounds.enabled.asObservable();

  public appVersion: string = packageJson.version;
  constructor(public environmentInjector: EnvironmentInjector, public sounds: SoundService) { }
}
