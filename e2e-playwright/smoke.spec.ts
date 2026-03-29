import { test, expect } from '@playwright/test';

test('home loads and shows How to Play', async ({ page }) => {
  await page.goto('/home');
  await expect(page.getByRole('heading', { name: 'How to Play' })).toBeVisible();
});

test('navigate to setup from home', async ({ page }) => {
  await page.goto('/home');
  await page.locator('ion-button').filter({ hasText: 'New Game' }).click();
  await expect(page).toHaveURL(/\/setup/);
});
