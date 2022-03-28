/* eslint-disable import/no-unresolved */
import Head from 'next/head';
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
			<Head>
				<title>{profile.handle}'s profile - Agora</title>
			</Head>
			<div>
				<div className="flex items-start">
					<div>
						<h3 className="font-bold">{profile.handle}'s profile</h3>
						<div className="font-light text-md mb-4">
							User profile authenticated and created via Lens protocol
						</div>
					</div>
				</div>
				<div className="flex my-8">
					<img
						className="overflow-hidden rounded-full mr-4 w-20 h-20"
						src={
							profile.picture && profile.picture.original.url
								? profile.picture.original.url
								: 'https://storage.googleapis.com/opensea-static/opensea-profile/1.png'
						}
						alt="avatar"
					/>
					<div>
						<h1 className="font-semibold tracking-wide">
							{profile.handle} <span>{profile?.name}</span>
						</h1>
						<div>{profile.ownedBy}</div>
						<div>{profile.bio}</div>
					</div>
				</div>
			</div>
			<div className="w-1/3">
				<div className="flex items-center font-semibold mb-2">
					<span>
						<svg
							className="h-4 mr-1"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
							/>
						</svg>
					</span>
					<span>About</span>
				</div>
				<div className="mb-6">
					<div className="grid grid-cols-2">
						<div className="grid grid-cols-2">
							<div className="py-2 font-semibold">Name:</div>
							<div className="px-4 py-2">{profile.name}</div>
						</div>
						<div className="grid grid-cols-2">
							<div className="py-2 font-semibold">Twitter:</div>
							<div className="px-4 py-2">
								<a className="text-sky-600" href={profile.twitterUrl}>
									{profile.twitterUrl}
								</a>
							</div>
						</div>
						<div className="grid grid-cols-2">
							<div className="py-2 font-semibold">Location:</div>
							<div className="px-4 py-2">{profile.location}</div>
						</div>
						<div className="grid grid-cols-2">
							<div className="py-2 font-semibold">Website:</div>
							<div className="px-4 py-2">
								<a className="text-sky-600" href={profile.website}>
									{profile.website}
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
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
