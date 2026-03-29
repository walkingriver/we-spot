import { Injectable } from '@angular/core';
import { MersenneTwister } from 'random-seedable';

@Injectable({
  providedIn: 'root',
})
export class ShuffleService {
  random: MersenneTwister = new MersenneTwister();

  seed(slug = 'xyz'): void {
    const hash = this.hashCode(slug);
    this.random.seed = hash;
  }

  hashCode(str: string): number {
    return Array.from(str).reduce(
      (s, c) => (Math.imul(31, s) + c.charCodeAt(0)) | 0,
      0,
    );
  }

  shuffle<T>(array: T[]): T[] {
    return this.random.shuffle(array) as T[];
  }
}
