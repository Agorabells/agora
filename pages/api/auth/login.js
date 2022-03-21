import nc from 'next-connect';
import sessionMiddleware from '../../../lib/session.module';


const handler = nc();

handler.use(sessionMiddleware);

handler.post( async (req, res) => {
	try {
		req.session.user = { ...req?.session?.user, ...req.body };
		await req.session.commit();
		res.status(200).json({ success: true, address: req.body.address });
	} catch (e) {
		res.status(400).json({ error: e });
	}
});

export default handler;
