import getPublicationsRequest from './gql/get-publications-request';

export const explore = async () => {
	const result = await getPublicationsRequest({
		// switch for `TOP_COLLECTED` if you wanted collected!
		sortCriteria: 'TOP_COMMENTED',
		limit: 10,
	});

	return result.data;
};
