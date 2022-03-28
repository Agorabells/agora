import Router from 'next/router';
import Head from 'next/head';
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
			<Head>
				<title>Login - Agora</title>
			</Head>
			<h1 className="py-2 font-bold">Welcome to Agora </h1>
			<button
				className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
				onClick={() => onClick()}
			>
				Connect Wallet
			</button>
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
