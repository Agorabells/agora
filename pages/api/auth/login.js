import nc from 'next-connect';
import { getSigner, getSignerAddress } from '../../../lib/ethers.module';
import sessionMiddleware from '../../../lib/session.module';

const handler = nc();

handler.use(sessionMiddleware);

handler.post(async (req, res) => {
	console.log('im here login');
	// await getSigner();
	// const address = await getSignerAddress();
	// const accessToken = await loginAuthenticate();
	console.log('accesstoken from login');
	// console.log(accessToken);

	try {
		req.session.user = { ...req?.session?.user, ...req.body };
		// req.session.accessToken = accessToken;
		console.log(req.session);
		await req.session.commit();
		res.status(200).json({ success: true, address: req.body.address });
	} catch (e) {
		res.status(400).json({ error: e });
	}
});

export default handler;
