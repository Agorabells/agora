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
			<h1 className="font-bold mb-4">Post NFT</h1>
			<div className="flex">
				<div className="mb-6">
					<a href={`/profiles/${profile.id}/`}>
						<img
							className="overflow-hidden rounded-full mr-4 w-20 h-20"
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
				<div className="font-semibold tracking-wide mr-2">
					{profile.name}
					<span className="italic font-light ml-2">({handle})</span>
					<div className="text-xs">COMMENTS: {totalAmountOfComments}</div>
				</div>
			</div>
			<div className="line-clamp-3">{content}</div>
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
