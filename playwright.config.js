import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const url =
	'https://z7rnktzokh.execute-api.us-east-1.amazonaws.com'; /** @todo create a hostname for this */
export default defineConfig({
	expect: {
		toMatchSnapshot: { maxDiffPixelRatio: 0.1 },
	},
	fullyParallel: true,
	maxFailures: 0,
	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] },
		},
	],
	reporter: 'html',
	testDir: './tests',
	use: {
		baseURL: url,
		trace: 'on-first-retry',
	},
});
