/* eslint-disable import/no-named-as-default */
import getPublicationRequest from '../gql/get-publication';

export const getPublication = async (publicationID) => {
	const result = await getPublicationRequest(publicationID);
	return result.data;
};
