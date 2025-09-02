// @ts-check
import { test, expect } from '@playwright/test';

test('homepage has correct title and content', async ({ page }) => {
  // Navigate to the homepage
  await page.goto('http://localhost:5173');

  // Check the page title
  await expect(page).toHaveTitle(/Vite \+ React/);

  // Check if React logo is visible
  const reactLogo = page.getByAltText('React logo');
  await expect(reactLogo).toBeVisible();

  // Check if the count button is present
  const countButton = page.getByText('count is', { exact: false });
  await expect(countButton).toBeVisible();

  // Test the counter functionality
  await countButton.click();
  await expect(countButton).toContainText('1');
}); 