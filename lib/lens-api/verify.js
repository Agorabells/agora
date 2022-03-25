import explorePublicationsRequest from './gql/explore-publications-request';
import { withSession } from '../server/withSession';

export const verify = async (accessToken) => {
	const sreq = withSession();
	console.log(sreq.withSession);
	const result = await explorePublicationsRequest({
		// switch for `TOP_COLLECTED` if you wanted collected!
		sortCriteria: 'TOP_COMMENTED',
		limit: 10,
	});

	return result.data;
};
