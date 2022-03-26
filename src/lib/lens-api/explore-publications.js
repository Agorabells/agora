import explorePublicationsRequest from '../gql/explore-publications-request';

export const explore = async (req) => {
	const result = await explorePublicationsRequest({
		// switch for `TOP_COLLECTED` if you wanted collected!
		sortCriteria: 'TOP_COMMENTED',
		limit: 10,
	});

	return result.data;
};
