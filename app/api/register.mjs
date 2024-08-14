import arc from '@architect/functions';

/**
 * someone has submitted the registration form
 * @type {import('@enhance/types').EnhanceApiFn} */
export async function post(request) {
	// extract the username and apikey from the form data
	const { username, apikey } = request.body;
	console.debug('👤registering', { username, apikey });
	try {
		// fetch the user's profile from the retroachievements api
		const params = new URLSearchParams({ u: username, y: apikey, z: username });
		const url = 'https://retroachievements.org/API/API_GetUserProfile.php?' + params.toString();
		const response = await fetch(url);
		const data = await response.json();
		if (data.errors) {
			throw new Error('could not fetch profile', { cause: { data, url } });
		}
		console.debug('👋 register response', { data });

		// save the user's profile to the database
		const db = await arc.tables();
		const putResult = await db.users.put({ apikey, username });
		console.debug('📅 registration saved', { putResult });

		// redirect to the user's profile page
		return { location: `/users/${username}` };
	} catch ({ cause, message }) {
		const { data, url } = cause;
		const { errors } = data;
		console.error('🛑 register failed', { message, errors, url });
		return { json: { error: 'failed to register, try again later' } };
	}
}
