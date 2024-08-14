import 'dotenv/config';
import { test, expect } from '@playwright/test';

const { RA_USERNAME } = process.env;

test.describe('the user profile page', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/users/' + RA_USERNAME);
		/** @todo ensure that the username has been registered prior to testing */
	});

	test('displays achievements', async ({ page }) => {
		// expect the user's achievements to be displayed
		await expect(page.getByRole('list'), 'achievement list has items').toHaveCount();
	});
});
