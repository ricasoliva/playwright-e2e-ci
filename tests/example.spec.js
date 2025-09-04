// @ts-check
import { test, expect } from '@playwright/test';
import { login } from '../helpers/login.js';


test('login test', async ({ page }) => {
  await login(page);
  // Example assertion
  await expect(page).toHaveURL(/inventory/);
});
