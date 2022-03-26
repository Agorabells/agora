// eslint-disable-next-line import/no-named-as-default
import updateProfileRequest from '../gql/update-profile';

export const updateProfile = async (profileInfo, accessToken) => {
	let updateProfileResult;

	try {
		updateProfileResult = await updateProfileRequest(profileInfo, accessToken);
	} catch (error) {
		console.log(error);
	}

	return updateProfileResult;
};
