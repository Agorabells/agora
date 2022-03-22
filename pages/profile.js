import { withSession } from '../lib/server/withSession';
import { login } from '../lib/lens-api/login';
import { createProfile } from '../lib/lens-api/create-profile';


export default function Profile({ user }) {
	const onClick = async () => {
		const accessTokens = await login(user?.address);
		console.log(accessTokens.authenticate.accessToken);
		const res = await createProfile(accessTokens.authenticate.accessToken);
		console.log(res);
	}
	return (
		<div>
			<h1>{ user?.address }</h1>
			<button onClick={() => onClick()}>Create Profile</button>
		</div>
	)
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
	}
})
