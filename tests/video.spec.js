import { expect, test } from "@playwright/test";
import { CommonPageLocator } from "../locators/commonPageLocator";
import { login } from '../helpers/login.js';
import { completeWelcomeVideo } from "../helpers/welcomeVideo.js";

test.only("video test", async ({ page }) => {
  await login(page);
  await page.waitForTimeout(1000);
  await completeWelcomeVideo(page, CommonPageLocator); // complete welcome video

  await expect(page).toHaveURL(/s/);
  await page.waitForTimeout(3000);

  await page.locator("img[alt='JavaScript']").nth(1).click();
  await page.locator("img[alt='JavaScript']").nth(2).click();
  
  await page.waitForTimeout(3000);
  const missions = page.locator('.col-span-full'); // Update this selector if needed
  const missionCount = await missions.count();

  expect(missionCount).toBe(10);

  for (let i = 0; i < missionCount; i++) {
    console.log(`🔍 Checking Mission ${i + 1}...`);

    const missionBlock = missions.nth(i);

    // Check block is visible
    await expect(missionBlock).toBeVisible();

    // Look for the "はじめる" button inside the current block
    const startButton = missionBlock.getByRole('button', { name: 'はじめる' });
    await expect(startButton).toBeVisible();

    console.log(`✅ "はじめる" button is visible for Mission ${i + 1}`);
  }
});
