import Router from 'next/router';
import { withSession } from '../lib/server/withSession';

export default function Profile({ user }) {
	const { profile, accessToken } = user;

	const editProfile = async () => {
		if (profile?.handle) {
			Router.push('/update-profile');
		}
	};
	if (profile) {
		return (
			<div>
				<h1>address: {user?.address}</h1>
				<h4>handle: {profile?.handle}</h4>
				<h4>name: {profile?.name}</h4>
				<h4>profileIDs: {profile?.id}</h4>
				<h4>bio: {profile?.bio}</h4>
				<h4>coverPicture: {profile?.coverPicture}</h4>
				<h4>location: {profile?.location}</h4>
				<h4>twitterUrl: {profile?.twitterUrl}</h4>
				<h4>website: {profile?.website}</h4>
				<h4>accessToken: {accessToken}</h4>
				<img
					className="w-10 h-10 rounded-full mr-4"
					src={
						profile.profilePictureUri
							? profile.profilePictureUri
							: 'https://storage.googleapis.com/opensea-static/opensea-profile/1.png'
					}
					alt={profile?.name}
				/>

				<button
					className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
					onClick={(e) => {
						e.preventDefault();

						editProfile();
					}}
				>
					Edit Profile
				</button>
			</div>
		);
	}
	return <div>user not login</div>;
}

export const getServerSideProps = withSession(({ req, res }) => {
	if (!req?.session?.user) {
		res.setHeader('location', '/login');
		res.statusCode = 302;
		res.end();
	}

	return {
		props: {
			user: req?.session?.user,
		},
	};
});
