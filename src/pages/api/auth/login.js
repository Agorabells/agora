import nc from 'next-connect';
import sessionMiddleware from '../../../lib/session.module';
import { getProfiles } from '../../../lib/lens-api/get-profiles';
import { createProfile } from '../../../lib/lens-api/create-profile';

const handler = nc();

handler.use(sessionMiddleware);

handler.post(async (req, res) => {
	const { accessToken, address } = req.body;
	const { authenticate } = accessToken;

	try {
		// ? get wallet user profile item[0]
		const profilesResult = await getProfiles('ownedBy', address);
		const sess = req.session;

		sess.user = {
			...req?.session?.user,
			address,
			authenticatedToken: authenticate, // refreshToken &accessToken
			accessToken: authenticate.accessToken,
		};
		// ? check if profile exist
		if (profilesResult && profilesResult.profiles && profilesResult.profiles.items.length > 0) {
			const profile = profilesResult?.profiles?.items[0];
			// ?set profile
			sess.user.profile = profile;
		} else {
			// ? if user not exist create user and save basic info
			const profile = await createProfile(authenticate.accessToken);
			sess.user.profile = profile;
		}

		await req.session.commit();
		res.status(200).json({ success: true, address });
	} catch (e) {
		console.log(error);
		res.status(400).json({ error });
	}
});

export default handler;
