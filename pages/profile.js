import { withSession } from '../lib/server/withSession';
import { loginAuthenticate } from '../lib/lens-api/login-authenticate';
import { createProfile } from '../lib/lens-api/create-profile';

export default function Profile({ user }) {
	const createNewProfile = async () => {
		// const accessTokens = await loginAuthenticate(user?.address);
		// console.log(`accessTokens${accessTokens.authenticate.accessToken}`);
		const res = await createProfile(accessTokens.authenticate.accessToken);
		console.log('res');
		console.log(res);
	};
	return (
		<div>
			<h1>{user?.address}</h1>
			<button onClick={() => createNewProfile()}>Create Profile</button>
		</div>
	);
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
			accessToken: req?.session?.accessToken,
		},
	};
});
