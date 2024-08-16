import { Console } from 'console';

/** @type {import('@enhance/types').EnhanceElemFn} */
export default function UserProfileElement({ html, state }) {
	const { store } = state;
	const { username, user } = store;
	const { recentAchievements } = user;
	console.debug('👤 UserProfileElement', { username, user, recentAchievements });
	return html`
	<style>
		.itemAchievement img {
			max-width: 64px;
			vertical-align: middle;
		}
	</style>
	<site-header></site-header>
		<h2>${username}'s profile</h2>
		<h3>achievements</h3>
		<ol role="list" name="achievementsList">
			${recentAchievements
				.map(
					({
						AchievementID,
						Author,
						BadgeName,
						BadgeURL,
						ConsoleName,
						Date: AchievementDate,
						Description,
						GameIcon,
						GameID,
						GameTitle,
						GameURL,
						HardcoreMode,
						Points,
						Title,
						TrueRatio,
						Type,
					}) => {
						const relativeDate = new Date(AchievementDate).toLocaleDateString();
						return html`<li class="itemAchievement">
							<h4>
								<img
									src="https://media.retroachievements.org/${BadgeURL}"
									alt="${BadgeName}"
								/>${Title} - ${Description} -
								<time datetime="${AchievementDate}">${relativeDate}</time>
							</h4>
							<p>
								<a href="${GameURL}"
									><img
										src="https://media.retroachievements.org${GameIcon}"
										alt="${GameTitle} icon"
									/>
									#${GameID} ${GameTitle} - ${ConsoleName}</a
								>
							</p>
							<details>
								<summary>details</summary>
								<dl>
									<dt>AchievementID</dt>
									<dd>${AchievementID}</dd>
									<dt>Author</dt>
									<dd>${Author}</dd>
									<dt>HardcoreMode</dt>
									<dd>${HardcoreMode}</dd>
									<dt>Points</dt>
									<dd>${Points}</dd>
									<dt>TrueRatio</dt>
									<dd>${TrueRatio}</dd>
									<dt>Type</dt>
									<dd>${Type}</dd>
								</dl>
							</details>
						</li>`;
					},
				)
				.join('')}
		</ol>
		<site-footer></site-footer>`;
}
