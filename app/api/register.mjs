import arc from '@architect/functions';

/**
 * someone has submitted the registration form
 * @type {import('@enhance/types').EnhanceApiFn} */
export async function post(request) {
	try {
		// extract the username and apikey from the form data
		const { username, apikey } = request.body;
		console.debug('👤registering', { username, apikey });
		if (!apikey || !username) {
			throw new Error(`missing required fields`, { cause: { username, apikey } });
		}

		// fetch the user's profile from the retroachievements api
		const params = new URLSearchParams({ u: username, y: apikey, z: username });
		const url = 'https://retroachievements.org/API/API_GetUserProfile.php?' + params.toString();
		const response = await fetch(url);
		const data = await response.json();
		console.debug('👋 register response', { data });
		if (data.errors) {
			throw new Error('could not fetch profile', { cause: { data, url } });
		}

		// save the user's profile to the database
		const db = await arc.tables();
		const putResult = await db.users.put({ apikey, username });
		console.debug('📅 registration saved', { putResult });

		// enqueue a task to fetch achievements for the user
		const publishResponse = await arc.queues.publish({
			name: 'GetUserRecentAchievements',
			payload: { apikey, username },
		});
		console.debug('⚓ GetUserRecentAchievements published', { publishResponse });

		// redirect to the user's profile page
		return { location: `/users/${username}` };
	} catch ({ cause, message }) {
		const { data, url } = cause;
		const { errors } = data;
		console.error('🛑 register failed', { message, errors, url });
		return { json: { error: 'failed to register, try again later' } };
	}
}
