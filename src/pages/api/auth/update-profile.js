import nc from 'next-connect';
import sessionMiddleware from '../../../lib/session.module';
import { updateProfile } from '../../../lib/lens-api/update-profile';

const handler = nc();

handler.use(sessionMiddleware);

handler.post(async (req, res) => {
	const {
 bio, name, coverPicture, location, website, twitterUrl, profilePictureUri,
} = req.body;
	console.log(req.body);

	try {
		const sess = req.session;

		const { accessToken, profile } = sess.user;

		const profileInfo = {
			profileId: profile.id,
			name,
			bio,
			location,
			website,
			twitterUrl,
			coverPicture,
		};

		// ? update  profile info
		console.log(' update  profile info');

		const updateProfileResult = await updateProfile(profileInfo, accessToken);
		if (updateProfileResult.data) {
			req.session.user.profile = {
				...req.session.user.profile,
				...profileInfo,
			};
			await req.session.commit();
		}

		res.status(200).json({ success: true, message: 'updated' });
	} catch (error) {
		console.log('error.toString()');
		console.log(error.toString());
		res.status(400).json({ error });
	}
});

export default handler;
