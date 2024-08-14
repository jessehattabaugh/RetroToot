import { test, expect } from '@playwright/test';

test.describe('the root index page', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
	});

	test('should display the title', async ({ page }) => {
		await expect(page.locator('h1 >> text=RetroToot'), 'displays the title').toBeVisible();
	});
});