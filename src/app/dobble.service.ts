/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
/**
 * TypeScript function to generate combinatorial geometric series
 * for board games like Dobble / Spot it!
 *
 * Each generated series is expected to have the following features:
 *
 * - a given number (N) of different elements, as long as N is a prime number +1
 * - one (and only one) element in common with each other series;
 *
 * Released on GNU - General Public Licence v3.0
 * https://www.gnu.org/liceNes/gpl-3.0.en.html
 *
 * Darkseal, 2018-2019
 * https://www.ryadel.com/en/dobble-spot-it-algorithm-math-function-javascript
 *
 * WalkingRiver, 2022 (Angular/TypeScript service)
 *
 * -----------------------------------------------------------------------------
 */
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DobbleService {
  deck: number[][] = [];

  /**
   *
   * @param symbolsPerCard: number of different symbols on each card
   */
  public dobble(symbolsPerCard = 8): number[][] {
    this.deck = [];
    let nC = 0;    // progressive number of cards
    const sTot: number[][] = []; // array of series (cards)

    // check if symbols is valid (it must be a prime number +1)
    if (!isPrime(symbolsPerCard - 1)) {
      console.error('<pre>ERROR: N value (' + symbolsPerCard + ') is not a prime number +1:');
      console.error(' some tests will fail.</pre>');
      return [];
    }

    // Generate series from #01 to #N
    for (let i = 0; i <= symbolsPerCard - 1; i++) {
      const s: number[] = [];
      nC++;
      s.push(1);
      for (let i2 = 1; i2 <= symbolsPerCard - 1; i2++) {
        s.push((symbolsPerCard - 1) + (symbolsPerCard - 1) * (i - 1) + (i2 + 1));
      }
      sTot.push(s);
    }

    // Generate series from #N+1 to #N+(N-1)*(N-1)
    for (let i = 1; i <= symbolsPerCard - 1; i++) {
      for (let i2 = 1; i2 <= symbolsPerCard - 1; i2++) {
        const s = [];
        nC++;
        s.push(i + 1);
        for (let i3 = 1; i3 <= symbolsPerCard - 1; i3++) {
          s.push((symbolsPerCard + 1) + (symbolsPerCard - 1) * (i3 - 1) + (((i - 1) * (i3 - 1) + (i2 - 1))) % (symbolsPerCard - 1));
        }
        sTot.push(s);
      }
    }

    // Print the series to screen
    // outputSeries(sTot);

    // perform 1000 test and print the results to screen
    // outputTest(sTot, 1000);

    this.deck = sTot;
    return sTot;
  }
}

function isPrime(num) {
  for (let i = 2; i < num; i++) {
    if (num % i === 0) { return false; }
  }
  return num > 1;
};

function pad(n, width, z = '0') {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

function outputSeries(sTot: number[][]) {
  const nPad = sTot.length.toString().length;
  let cnt = 0;
  console.log('<div>Printing ' + sTot.length + ' series of ' + sTot[0].length + ' elements each.</div>');
  console.log('<pre>');
  for (let i = 0; i < sTot.length; ++i) {
    cnt++;
    let sLog = '#' + this.pad(cnt, nPad) + ':';
    for (const i2 of sTot[i]) {
      sLog += ' ' + this.pad(sTot[i][i2], nPad);
    }
    console.log(sLog + '\n');
  }
  console.log('</pre>');
}

// test function
// compares n pairs of different series randomly taken from sTot
// and outputs the results.
function outputTest(sTot, n) {
  let nSucc = 0;
  let nFail = 0;
  let err = '';
  for (let i = 0; i < n; i++) {
    const i1 = Math.floor(Math.random() * (sTot.length - 1));
    let i2 = 0;
    do {
      i2 = Math.floor(Math.random() * (sTot.length - 1));
    }
    while (i1 === i2);
    const s1 = sTot[i1];
    const s2 = sTot[i2];
    let nEquals = 0;
    for (const p1 of s1) {
      for (const p2 of s2) {
        if (s1[p1] === s2[p2]) {
          nEquals++;
        }
      }
    }
    if (nEquals === 1) {
      nSucc++;
    }
    else {
      nFail++;
      err += 'FAILURES #' + nFail + ': Series #' + s1 + ' and series #' + s2 + ' do have ' + nEquals + ' numbers in common. +\n';
    }
  }
  console.log('<pre>');
  console.log('Test result (after ' + n + ' tests):\n');
  console.log('- SUCCESS #: ' + nSucc + '\n');
  console.log('- FAILURE #: ' + nFail + '\n');
  if (nFail > 0) {
    console.log('<pre>' + err + '</pre>');
  }
}
