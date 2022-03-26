import explorePublicationsRequest from '../gql/explore-publications';

export const verify = async (accessToken) => {
	const result = await explorePublicationsRequest({
		// switch for `TOP_COLLECTED` if you wanted collected!
		sortCriteria: 'TOP_COMMENTED',
		limit: 10,
	});

	return result.data;
};
