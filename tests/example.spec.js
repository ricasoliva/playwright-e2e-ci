// @ts-check
import path from 'path';
import { config } from 'dotenv';
import { test, expect } from '@playwright/test';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Get __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Only load dotenv in non-CI environments
if (!process.env.CI) {
  config({ path: path.join(__dirname, '..', '.env') });
}

// Make sure required env vars exist
const username = process.env.USERNAME;
const password = process.env.PASSWORD;

if (!username || !password) {
  throw new Error('Missing USERNAME or PASSWORD environment variables.');
}

test.only('login test', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.getByPlaceholder('Username').fill(username);
  await page.getByPlaceholder('Password').fill(password);
  await page.getByRole('button', { name: 'Login' }).click();

  // Example assertion
  await expect(page).toHaveURL(/inventory/);
});
