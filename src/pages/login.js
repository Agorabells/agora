import Router from 'next/router';
import { getSigner, getSignerAddress } from '../lib/ethers.module';
import { withSession } from '../lib/server/withSession';
import { loginAuthenticate } from '../lib/lens-api/login-authenticate';

export default function Login() {
	const onClick = async () => {
		// connect metamask
		await getSigner();
		// authenticate and get accessToken
		const accessToken = await loginAuthenticate();
		const payload = {
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				address: await getSignerAddress(),
				accessToken,
			}),
			method: 'POST',
		};
		const resp = await fetch('/api/auth/login', payload);
		const { success } = await resp.json();
		if (success) {
			Router.push('/login');
		}
	};

	return (
		<div>
			<h1>Login</h1>
			<button onClick={() => onClick()}>Connect</button>
		</div>
	);
}

export const getServerSideProps = withSession(({ req, res }) => {
	if (req?.session?.user) {
		res.setHeader('location', '/profile');
		res.statusCode = 302;
		res.end();
	}
	return {
		props: {},
	};
});
