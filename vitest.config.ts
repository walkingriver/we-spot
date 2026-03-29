import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

const root = fileURLToPath(new URL('.', import.meta.url));
const ionicLoader = resolve(root, 'node_modules/@ionic/core/loader/index.js');
const ionicComponents = resolve(root, 'node_modules/@ionic/core/components/index.js');

export default defineConfig({
  resolve: {
    alias: {
      '@ionic/core/loader': ionicLoader,
      '@ionic/core/components': ionicComponents,
    },
  },
  test: {
    server: {
      deps: {
        inline: [/@ionic\//],
      },
    },
  },
});
