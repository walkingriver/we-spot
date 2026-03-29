/**
 * Build-time generator for Dobble / Spot It! deck structures.
 * Algorithm source: GPL v3 — keep this file OUT of the shipped web bundle.
 * Run: node tools/deck-generator/generate.mjs
 */
import { writeFileSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '../..');
const outDir = join(root, 'src/assets/decks');

function isPrime(num) {
  for (let i = 2; i < num; i++) {
    if (num % i === 0) return false;
  }
  return num > 1;
}

function dobble(symbolsPerCard) {
  const sTot = [];
  if (!isPrime(symbolsPerCard - 1)) {
    throw new Error(`N (${symbolsPerCard}) must be prime + 1`);
  }
  for (let i = 0; i <= symbolsPerCard - 1; i++) {
    const s = [];
    s.push(1);
    for (let i2 = 1; i2 <= symbolsPerCard - 1; i2++) {
      s.push((symbolsPerCard - 1) + (symbolsPerCard - 1) * (i - 1) + (i2 + 1));
    }
    sTot.push(s);
  }
  for (let i = 1; i <= symbolsPerCard - 1; i++) {
    for (let i2 = 1; i2 <= symbolsPerCard - 1; i2++) {
      const s = [];
      s.push(i + 1);
      for (let i3 = 1; i3 <= symbolsPerCard - 1; i3++) {
        s.push(
          symbolsPerCard +
            1 +
            (symbolsPerCard - 1) * (i3 - 1) +
            (((i - 1) * (i3 - 1) + (i2 - 1)) % (symbolsPerCard - 1)),
        );
      }
      sTot.push(s);
    }
  }
  return sTot;
}

const SIZES = [4, 6, 8, 12];
const combined = {};

mkdirSync(outDir, { recursive: true });

for (const n of SIZES) {
  const deck = dobble(n);
  combined[String(n)] = deck;
  writeFileSync(join(outDir, `dobble-${n}.json`), JSON.stringify(deck));
}

writeFileSync(join(outDir, 'index.json'), JSON.stringify(combined, null, 0));
console.log('Wrote deck JSON to', outDir);
