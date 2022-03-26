import getProfilesRequest from '../gql/get-profiles';

export const getProfiles = async (type, resQuery) => {
	let request;
	if (type === 'getSignerAddress') {
		query = await getSignerAddress();
		request = { ownedBy: [query], limit: 10 };
	}
	if (type === 'ownedBy') {
		request = { ownedBy: [resQuery], limit: 10 };
	}
	if (type === 'handles') {
		request = { handles: [resQuery], limit: 1 };
	}
	if (type === 'profileIds') {
		request = { profileIds: [resQuery], limit: 1 };
	}

	const result = await getProfilesRequest(request);
	return result.data;
};
