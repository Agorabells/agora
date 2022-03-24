import { gql } from '@apollo/client/core';
import { apolloClient } from '../apollo-client';

const CREATE_PROFILE = `
   mutation($request: CreateProfileRequest!) { 
    createProfile(request: $request) {
      ... on RelayerResult {
        txHash
      }
      ... on RelayError {
        reason
      }
            __typename
    }
 }
`;

const createProfileRequest = async (createProfileQuery, accessToken) => {
	return apolloClient(accessToken).mutate({
		mutation: gql(CREATE_PROFILE),
		variables: {
			request: createProfileQuery,
		},
	});
};
export default createProfileRequest;
