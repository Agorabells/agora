import { gql } from '@apollo/client/core';
import { apolloClient } from '../apollo-client';
// https://docs.lens.dev/docs/update-profile
// https://github.com/aave/lens-api-examples/blob/master/src/profile/update-profile.ts

const UPDATE_PROFILE = `
  mutation($request: UpdateProfileRequest!) { 
    updateProfile(request: $request) {
     id
    }
 }
`;

export const updateProfileRequest = (profileInfoQuery, accessToken) => {
	return apolloClient(accessToken).mutate({
		mutation: gql(UPDATE_PROFILE),
		variables: {
			request: profileInfoQuery,
		},
	});
};

export default updateProfileRequest;
