/** @type {import('@enhance/types').EnhanceElemFn} */
export default function AchievementsList({ html, state }) {
	// get the achievements from the state
	const { store } = state;
	const { achievements } = store;

	const items = achievements.map(
		({
			AchievementID,
			BadgeName,
			BadgeURL,
			ConsoleName,
			Date: AchievementDate,
			Description,
			GameIcon,
			GameTitle,
			GameURL,
		}) => {
			const now = new Date();
			// Parse the date string (assuming UTC)
			const date = new Date(AchievementDate);
			// Calculate the time difference in seconds
			const diffInSeconds = Math.round((date - now) / 1000);
			// Format the time difference;
			const diffInMinutes = Math.round(diffInSeconds / 60);
			const timeAgo = new Intl.RelativeTimeFormat('en').format(diffInMinutes, 'minutes');

			console.debug('🎖️ achievements-list item', {
				AchievementDate,
				AchievementID,
				BadgeName,
				BadgeURL,
				ConsoleName,
				Description,
				GameIcon,
				GameTitle,
				GameURL,
				timeAgo,
			});
			return html`
				<li>
					<dl>
						<dt>AchievementID</dt>
						<dd>${AchievementID}</dd>
						<dt>BadgeName</dt>
						<dd>${BadgeName}</dd>
						<dt>BadgeURL</dt>
						<dd>${BadgeURL}</dd>
						<dt>ConsoleName</dt>
						<dd>${ConsoleName}</dd>
						<dt>AchievementDate</dt>
						<dd><time datetime=${AchievementDate}>${timeAgo}</time></dd>
						<dt>Description</dt>
						<dd>${Description}</dd>
						<dt>GameIcon</dt>
						<dd>${GameIcon}</dd>
						<dt>GameTitle</dt>
						<dd>${GameTitle}</dd>
						<dt>GameURL</dt>
						<dd>${GameURL}</dd>
					</dl>
				</li>
			`;
		},
	);

	return html`<ol>
		${items.join('')}
	</ol>`;
}
