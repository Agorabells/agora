import { gql } from '@apollo/client/core';
import { apolloClient } from '../apollo-client';
// https://docs.lens.dev/docs/verify-jwt
// https://github.com/aave/lens-api-examples/

const VERIFY = `
  query($request: VerifyRequest!) {
    verify(request: $request)
  }
`;

export const verify = (accessToken) => {
	return apolloClient().query({
		query: gql(VERIFY),
		variables: {
			request: {
				accessToken,
			},
		},
	});
};

export default verify;
