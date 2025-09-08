// @ts-check
import { test, expect } from '@playwright/test';
import { login } from '../helpers/login.js';


test('login test', async ({ page }) => {
  await login(page);
  await page.waitForTimeout(2000);
  // Example assertion
  await expect(page).toHaveURL(/inventory/);
});
