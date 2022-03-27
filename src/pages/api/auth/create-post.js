import nc from 'next-connect';
import sessionMiddleware from '../../../lib/session.module';
import { createPost } from '../../../lib/lens-api/create-post';

const handler = nc();

handler.use(sessionMiddleware);

handler.post(async (req, res) => {
	console.log('req.bodysdfsd');
	const { content, name, description } = req.body;

	try {
		const sess = req.session;

		const { address, accessToken, profile } = sess.user;
		const { id } = profile;
		const postInfo = {
			// profileId: profile.id,
			content,
			name,
			description,
			externalURL,
		};

		// ? update  profile info
		console.log(' create  post info');
		const createPostResult = await createPost(postInfo, id, address, accessToken);
		console.log('createPostResult');
		console.log(createPostResult);
		// if (updateProfileResult.data) {
		// 	req.session.user.profile = {
		// 		...req.session.user.profile,
		// 		...profileInfo,
		// 	};
		// 	await req.session.commit();
		// }

		res.status(200).json({ success: true, message: 'updated' });
	} catch (error) {
		console.log('error.toString()');
		console.log(error.toString());
		res.status(400).json({ error });
	}
});

export default handler;
