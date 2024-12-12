import { test, expect } from '@playwright/test';
import testData from './data/data_dashboard.json';
import DemoAppPage from './pom.js';
import credentials from './credentials.js';

testData.forEach(({ scenario, navigateTo, itemToVerify }) => {
  test(scenario, async ({ page }) => {
    const dashboard = new DemoAppPage(page);

    // Step 1: Login to Demo App
    await page.goto('https://animated-gingersnap-8cf7f2.netlify.app/');
    
    const username = 'admin';
    const password = credentials[username];

    // Login to the dashboard
    await dashboard.login(username, password);

    // Step 2: Navigate to the specified page
    await dashboard.nagivateTo(navigateTo);

    // Step 3: Verify the item is in the correct column
    const columnLocator = await dashboard.getColumn(itemToVerify.column);
    await expect(columnLocator).toBeVisible();

    // Validate the column's heading text using regex (ignoring possible counts like "(2)")
    const columnHeading = columnLocator.locator('h2');
    await expect(columnHeading).toHaveText(new RegExp(itemToVerify.column));

    // Step 4: Verify the task is present in the column
    const taskLocator = await dashboard.getTask(columnLocator, itemToVerify.name);
    await expect(taskLocator).toBeVisible();

    // Validate the task's text
    await expect(taskLocator).toHaveText(itemToVerify.name);

    // Step 5: Verify tags within the task
    for (const tag of itemToVerify.tags) {
      console.log(`Checking tag: ${tag}`);
      const tagLocator = await dashboard.verifyTagExists(taskLocator, tag);
      await expect(tagLocator).toBeVisible();
      await expect(tagLocator).toHaveText(tag);
    }
  });
});