/* eslint-disable import/no-unresolved */
import { withSession } from '../../lib/server/withSession';
import { getProfiles } from '../../lib/lens-api/get-profiles';

export default function Profiles({ profile }) {
	const {
		name,
		id,
		bio,
		location,
		website,
		twitterUrl,
		picture,
		handle,
		coverPicture,
		ownedBy,
		stats,
	} = profile;
	const { totalFollowers, totalFollowing, totalPosts, totalComments } = stats;
	return (
		<div>
			<h1>Profile other page</h1>
			<div>{profile.name}</div>
			<div>{profile.id}</div>
			<div>{profile.bio}</div>
			<div>{profile.ownedBy}</div>
			<div>{profile.location}</div>
			<div>{profile.handle}</div>
		</div>
	);
}

export const getServerSideProps = withSession(async ({ req, res, params }) => {
	const { profiles } = await getProfiles('profileIds', params.profileURL);
	return {
		props: {
			profile: profiles.items[0],
		},
	};
});
