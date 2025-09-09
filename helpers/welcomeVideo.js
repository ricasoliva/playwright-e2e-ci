/**
 * Completes the welcome video by playing and closing it
 * @param {import('@playwright/test').Page} page
 * @param {object} locators - An object containing the locators needed for the video
 */
export async function completeWelcomeVideo(page, locators) {
    const vimeoIframeHandle = await page.waitForSelector(locators.VIMEO_IFRAME, { timeout: 20000 });
    const vimeoFrame = await vimeoIframeHandle.contentFrame();
    if (!vimeoFrame) {
      throw new Error('Could not access Vimeo frame');
    }
  
    const playButton = await vimeoFrame.waitForSelector(locators.PLAY_BUTTON, { timeout: 20000 });
    await playButton.click();
  
    await vimeoFrame.evaluate(() => {
      const video = document.querySelector('video');
      if (video) {
        video.currentTime = 100; // Skip to 1m40s
      }
    });
  
    await page.waitForTimeout(2000);
  
    await page.evaluate(() => {
      const selectors = [
        '.fixed.inset-0[style*="background-color: rgba(0, 0, 0, 0.7)"]',
        '.fixed.top-1\\/2.left-1\\/2',
        'iframe[src*="player.vimeo.com"]',
      ];
      selectors.forEach((selector) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((el) => el.remove());
      });
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    });
  }
  