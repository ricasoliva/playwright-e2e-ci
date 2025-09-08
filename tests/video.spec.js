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
});
