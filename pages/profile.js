import { withSession } from '../lib/server/withSession';
import { createProfile } from '../lib/lens-api/create-profile';

export default function Profile({ user }) {
	const { accessToken, profile } = user;

	const createNewProfile = async () => {
		const res = await createProfile(accessToken);
	};
	// const editProfile = async () => {
	// 	const res = await editProfile(accessToken);
	// };
	if (profile) {
		return (
			<div>
				<h1>address: {user?.address}</h1>
				<h4>handle: {profile?.handle}</h4>
				<h4>name: {profile?.name}</h4>
				<h4>profileIDs: {profile?.id}</h4>
				<h4>bio: {profile?.bio}</h4>
				<h4>coverPicture: {profile?.coverPicture}</h4>
				<h4>location: {profile?.coverPicture}</h4>
				<h4>twitterUrl: {profile?.twitterUrl}</h4>
				<h4>website: {profile?.website}</h4>
				<h4>accessToken: {accessToken}</h4>
				<img
					src={
						profile.profilePictureUri
							? profile.profilePictureUri
							: 'https://storage.googleapis.com/opensea-static/opensea-profile/1.png'
					}
					alt=""
				/>

				<button onClick={() => createNewProfile()}>Edit Profile</button>
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
