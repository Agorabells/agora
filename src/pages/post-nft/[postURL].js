/* eslint-disable import/no-unresolved */
import { withSession } from '../../lib/server/withSession';
import { getPublication } from '../../lib/lens-api/get-publication';

export default function PostNFT({ post }) {
	console.log(post);
	const { publication } = post;
	const { profile, metadata, stats, __typename } = publication;
	const { handle, id, ownedBy } = profile;
	const { totalFollowers, totalFollowing, totalPosts, totalAmountOfComments } =
		stats;
	const { content, description } = metadata;
	return (
		<div>
			<h1>Post NFT</h1>
			<div>{publication.id}</div>
			<div>{__typename}</div>
			<div>
				{profile.id} {profile.name}
				{handle}
			</div>
			<div>total comments {totalAmountOfComments}</div>
			<div>{content}</div>
			<div>{description}</div>
			<div>{ownedBy}</div>
			<a href={`/profiles/${profile.id}/`}>
				<img
					src={
						profile.picture && profile.picture.original.url
							? profile.picture.original.url
							: 'https://storage.googleapis.com/opensea-static/opensea-profile/1.png'
					}
					width={80}
					height={80}
					alt={profile?.name ? profile.name : 'unknown'}
				/>
			</a>
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
