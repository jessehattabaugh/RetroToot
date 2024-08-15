/** @import { Statuses, Status} from '../../../types' */
import arc from '@architect/functions';
const db = await arc.tables();
import { raurl } from '@architect/shared/raurl.js';

/** fetch a timeline and put the results in the database
 * @see https://arc.codes/queues
 * @param {any} event
 */
export async function handler(event) {
	console.debug(
		'🐕 GetUserRecentAchievements queue handler event',
		JSON.stringify(event, null, 2),
	);

	// for some reason SQS events can have multiple "Records"
	const { Records } = event;
	await Promise.all(
		Records.map(async ({ body }) => {
			const { apikey, username } = JSON.parse(body);
			console.debug('💽 GetUserRecentAchievements queue event handler', { apikey, username });
			const url = raurl(apikey, 'GetUserRecentAchievements', username);
			const response = await fetch(url);
			const achievements = await response.json();
			console.debug(`🏆 achievements`, { achievementCount: achievements.length, url });
			/** @todo insert the achievements in to the database */
		}),
	);
}
