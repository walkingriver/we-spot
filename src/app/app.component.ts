import { Component, ViewChild } from '@angular/core';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import packageJson from '../../package.json';
import { SoundService } from './sound.service';
import { delay, filter, map, take, tap } from 'rxjs/operators';
import { IonMenu } from '@ionic/angular';
import { of, timer } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  @ViewChild('menu', { static: true }) menu: IonMenu;

  appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'New Game', url: '/setup', icon: 'play' },
    { title: 'Image Credits', url: '/image-credits', icon: 'images' },
    // { title: 'Privacy Policy', url: '/privacy', icon: 'eye' },
    // { title: 'Terms & Conditions', url: '/terms', icon: 'book' }
  ];

  isEnabled = this.sounds.enabled.asObservable();
  updateAvailable =
    this.updater.versionUpdates
      .pipe(
        filter(event => event.type === 'VERSION_READY'),
        map(event => event as VersionReadyEvent),
        map(event => event.latestVersion.hash !== event.currentVersion.hash),
        tap(_ => { this.menu.open(); })
      );

  public appVersion: string = packageJson.version;
  constructor(public sounds: SoundService,
    private updater: SwUpdate) { }

  reload() {
    document.location.reload();
  }
}
