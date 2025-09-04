import { defineConfig } from '@playwright/test';

export default defineConfig({
  timeout: 60000, 
  testDir: 'tests', 
  testMatch: ['**/*.spec.js'],
  reporter: [['html']], 
  use: {
    headless: true, 
    video: 'on', 
    screenshot: 'on', 
  },
}); 