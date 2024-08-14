# RetroToot

Automatically publishes your RetroAchievements to Mastodon, letting you share your retro gaming triumphs with the fediverse!

## Installation

Install dependencies by running `npm install`, then start the development server with `npm start`.

## Deployment

To deploy, run `npm run deploy`. This will deploy the app to a staging url on AWS.

To deploy to production, run `npm run deploy:prod`.

To deploy to the test environment, run `npm run deploy:test`. Be careful not to do so while tests are running.

## Testing

Playwright is used for end-to-end testing. Tests are stored in `/tests`.

Tests run against the test environment. To deploy the current code to the test environment, run `npm run deploy:test`.

To run the tests against the test environment without deploying, run `npm test`.

To run the tests with a UI helpful for development, run `npm run test:ui`.

To generate new tests, run `npm run test:generate`.

The tests take screenshots in order to note when the page changes. When you want to update the screenshots, run `npm run test:update`.