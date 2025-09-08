import path from 'path';
import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

if (!process.env.CI) {
  config({ path: path.join(__dirname, '..', '.env') });
}

/**
 * Helper function to perform login in tests
 * @param {import('@playwright/test').Page} page
 */
export async function login(page) {
  const baseURL = 'https://digitane.jp/online-stg/login/';
  const email = process.env.LOGIN_EMAIL;
  const password = process.env.LOGIN_PASSWORD;

  page.on('dialog', async (dialog) => {
    console.log(`Dialog type: ${dialog.type()}, message: ${dialog.message()}`);
    await dialog.accept('digitane');
  });

  if (!email || !password) {
    console.error('Environment variables:', {
      email,
      envKeys: Object.keys(process.env)
    });
    throw new Error('Missing DIGITANE_EMAIL or DIGITANE_PASSWORD environment variable.');
  }

  await page.goto(baseURL);
  await page.getByRole('textbox', { name: 'メールアドレス' }).fill(email);
  await page.getByRole('textbox', { name: 'パスワード' }).fill(password);
  await page.getByRole('button', { name: 'ログイン' }).click();
}
