/* eslint-disable import/no-unresolved */
import { withSession } from '../../lib/server/withSession';
import { getPublication } from '../../lib/lens-api/get-publication';

export default function PostNFT({ post }) {
	console.log(post);
	const { publication } = post;
	const { profile, metadata, stats, __typename } = publication;
	const { handle } = profile;
	const { totalFollowers, totalFollowing, totalPosts, totalComments } = stats;
	return (
		<div>
			<h1>Post NFT</h1>
			<div>{publication.id}</div>
			<div>{publication.id}</div>
			<div>
				{profile.id} {profile.name}
				{handle}
			</div>
			{/* <div>{profile.id}</div> */}
			{/* <div>{profile.bio}</div>
			<div>{profile.ownedBy}</div>
			<div>{profile.location}</div>
			<div>{profile.handle}</div> */}
		</div>
	);
}

export const getServerSideProps = withSession(async ({ req, res, params }) => {
	console.log('params.postURL');
	const post = await getPublication(params.postURL);
	console.log('post');
	console.log(post);
	return {
		props: {
			post,
		},
	};
});
