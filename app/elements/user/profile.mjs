/** @type {import('@enhance/types').EnhanceElemFn} */
export default function UserProfileElement({ html, state }) {
	const { store } = state;
	const { username } = store;
	return html`<dl>
		<dt>username</dt>
		<dd>${username}</dd>
	</dl>
	<h2>achievements</h2>
	<ol role="list" name="achievementsList">
		<li>first achievement</li>
		<li>second achievement</li>
	</ol>`;
};