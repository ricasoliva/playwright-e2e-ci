// helpers/login.js
import path from 'path';
import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Get __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env only in local/dev
if (!process.env.CI) {
  config({ path: path.join(__dirname, '..', '.env') });
}

/**
 * @param {import('@playwright/test').Page} page
 */
export async function login(page) {
  const username = process.env.USERNAME;
  const password = process.env.PASSWORD;

  if (!username || !password) {
    throw new Error('Missing USERNAME or PASSWORD environment variables.');
  }

  await page.goto('https://www.saucedemo.com/');
  await page.getByPlaceholder('Username').fill(username);
  await page.getByPlaceholder('Password').fill(password);
  await page.getByRole('button', { name: 'Login' }).click();
}
