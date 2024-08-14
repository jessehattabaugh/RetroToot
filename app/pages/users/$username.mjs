/** load the user from the database and return their profile page
 * @type {import('@enhance/types').EnhanceApiFn}
 */
export async function get(request) {
	const { username } = request.params;
	// load the user data from the database
	return { json: { username } };
}