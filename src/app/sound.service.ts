import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Preferences } from '@capacitor/preferences';

interface GameSound {
  name: string;
  audio: HTMLAudioElement;
}

export type GameSoundName =
  'jump' |
  'coin' |
  'drum' |
  'game-over' |
  'kick' |
  'start' |
  'start2' |
  'stop' |
  'buzzer';

@Injectable({
  providedIn: 'root'
})
export class SoundService {
  sounds: GameSound[] = [];
  currentSound: HTMLAudioElement;
  enabled: BehaviorSubject<boolean> = new BehaviorSubject(true);
  private isEnabled = true;

  constructor() {
    this.sounds = this.loadSounds();

    Preferences.get({ key: 'soundEnabled' })
      .then(result => {
        if (JSON.parse(result.value)) {
          this.enable();
        } else {
          this.disable();
        }
      });
  }

  enable() {
    this.set(true);
  }

  disable() {
    this.set(false);
  }

  set(value: boolean) {
    this.isEnabled = value;
    this.enabled.next(value);
    Preferences.set({ key: 'soundEnabled', value: JSON.stringify(value) });
  }

  loadSounds(): GameSound[] {
    return allSounds.map((sound) => ({
      name: sound.name,
      audio: new Audio(`./assets/sounds/${sound.src}`)
    }));
  }

  stop() {
    if (this.currentSound?.ended && !this.currentSound.ended) {
      this.currentSound.pause();
      this.currentSound.currentTime = 0;
    }
  }

  play(name: string): Promise<void> {
    if (this.isEnabled) {
      stop();
      const sound = this.sounds.find(s => s.name === name);
      if (sound) {
        this.currentSound = sound.audio;
        return sound.audio.play();
      }
    }

    return Promise.resolve();
  }

  playRandom(soundNames: string[]): Promise<void> {
    const soundName = soundNames[Math.floor(Math.random() * soundNames.length)];
    return this.play(soundName);
    // const sound = this.sounds.find(s => s.name === soundName);
    // return sound?.audio?.play();
  }

  playFailureSound() {
    return this.playRandom(['kick', 'drum', 'jump', 'stop']);
  }

  playSuccessSound() {
    return this.play('coin');
  }
}

const allSounds = [
  { name: 'jump', src: 'cartoon-jump-6462.mp3' },
  { name: 'coin', src: 'collectcoin-6075.mp3' },
  { name: 'drum', src: 'failure-drum-sound-effect-2-7184.mp3' },
  { name: 'game-over', src: 'game-over-arcade-6435.mp3' },
  { name: 'kick', src: 'kick-tech-5825.mp3' },
  { name: 'start2', src: 'start-13691.mp3' },
  { name: 'start', src: 'start-computeraif-14572.mp3' },
  { name: 'stop', src: 'stop-13692.mp3' },
  { name: 'buzzer', src: 'wrong-buzzer-6268.mp3' }
];
