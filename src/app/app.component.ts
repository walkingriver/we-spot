import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  IonApp,
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonIcon,
  IonLabel,
  IonMenuToggle,
  IonRouterOutlet,
  IonFooter,
} from '@ionic/angular/standalone';
import packageJson from '../../package.json';
import { SoundService } from './sound.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: 'app.component.html',
  styleUrl: 'app.component.scss',
  imports: [
    RouterLink,
    IonApp,
    IonMenu,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonIcon,
    IonLabel,
    IonMenuToggle,
    IonRouterOutlet,
    IonFooter,
  ],
})
export class AppComponent {
  readonly sounds = inject(SoundService);

  readonly appPages = signal([
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'New Game', url: '/setup', icon: 'play' },
    { title: 'Image Credits', url: '/image-credits', icon: 'images' },
  ]);

  readonly appVersion = signal(packageJson.version);
}
