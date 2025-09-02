import { defineConfig } from '@playwright/test';

export default defineConfig({
  timeout: 60000, //timeout for each test
  testDir: 'tests', //directory for the tests
  testMatch: ['spec.js'], //pattern for the tests
  use: {
    headless: false, //for headless mode
    video: 'on', //retain-on-failure only keep video on failure. On and Off are also available.
    screenshot: 'on', //only-on-failure. only keep screenshot on failure. On and Off are also available.
  },
}); 