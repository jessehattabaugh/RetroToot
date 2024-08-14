import 'dotenv/config';
import { test, expect } from '@playwright/test';

const {RA_API_KEY, RA_USERNAME} = process.env;

test.describe('the registration page', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/register');
	});

	test('submit the form with valid data', async ({ page }) => {
		await page.getByLabel('Username:').fill(RA_USERNAME);
		await page.getByLabel('API Key:').fill(RA_API_KEY);
		await page.getByText('Register').click();
		await expect(page, 'redirected to user profile').toHaveURL(/users/);
		await expect(page.getByText(RA_USERNAME), 'displays the username').toBeVisible();
	});

	/** @todo test that invalid data causes an error */
	/** @todo test that users can only register themselves */
});