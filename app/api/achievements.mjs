/* @type {import('@enhance/types').EnhanceApiFn} */
export async function get(req) {
	// fetch the achievements from the retroachievements api
	const { u } = req.query;
	const { RA_USERNAME, RA_API_KEY } = process.env;
	const params = new URLSearchParams({ u, z: RA_USERNAME, y: RA_API_KEY, m: 1000000 });
	const url = 'https://retroachievements.org/API/API_GetUserRecentAchievements.php?' + params.toString();
	const response = await fetch(url);
	const achievements = await response.json();
	console.debug(`🏆achievements`, {u, achievementCount: achievements.length, url});
	return { json: { achievements } };
}
