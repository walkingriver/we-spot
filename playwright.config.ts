import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e-playwright',
  fullyParallel: true,
  forbidOnly: !!process.env['CI'],
  retries: process.env['CI'] ? 2 : 0,
  workers: process.env['CI'] ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://127.0.0.1:4200',
    trace: 'on-first-retry',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: 'npx ng serve --port 4200 --host 127.0.0.1',
    url: 'http://127.0.0.1:4200/',
    timeout: 180000,
    reuseExistingServer: !process.env['CI'],
  },
});
