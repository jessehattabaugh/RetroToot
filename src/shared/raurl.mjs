const RA_API_URL = 'https://retroachievements.org/API/';

/**
 * builds a url for the retroachievements api
 * @param {string} apikey the user's api key
 * @param {string} endpoint the api endpoint to call
 * @param {string} username the user's username
 */
export function raurl(apikey, endpoint, username) {
	if (!apikey || !endpoint || !username) {
		throw new Error('missing required arguments');
	}
	const params = new URLSearchParams({ z: username, y: apikey });
	const minutesInADay = 60 * 24;
	switch (endpoint) {
		/** @see https://api-docs.retroachievements.org/v1/get-user-recent-achievements.html */
		case 'GetUserRecentAchievements':
			params.append('u', username);
			params.append('m', minutesInADay);
			break;
	}
	const url = `${RA_API_URL}API_${endpoint}.php?${params.toString()}`
	console.debug('🔗 RA_URL', { apikey, endpoint, username, url });
	return url;
};