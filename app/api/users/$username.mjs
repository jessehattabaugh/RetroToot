import arc from '@architect/functions';

/** load the user from the database and return their profile page
 * @type {import('@enhance/types').EnhanceApiFn}
 */
export async function get(request) {
	const { username } = request.params;
	try {
		const db = await arc.tables();
		const user = await db.users.get({ username });
		console.debug('👋 user loaded', { username });
		if (!user) {
			throw new Error(`User ${username} not found`);
		}
		return { json: { username } };
	} catch ({message}) {
		console.error('🛑 failed to load user', { message });
		return { json: { message } };
	}
};
