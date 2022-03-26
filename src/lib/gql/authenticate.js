import { gql } from '@apollo/client/core';
import { apolloClient } from '../apollo-client';
// https://docs.lens.dev/docs/login
// https://github.com/aave/lens-api-examples/
const AUTHENTICATION = `
  mutation($request: SignedAuthChallenge!) { 
    authenticate(request: $request) {
      accessToken
      refreshToken
    }
 }
`;

const authenticate = (address, signature) => {
	return apolloClient().mutate({
		mutation: gql(AUTHENTICATION),
		variables: {
			request: {
				address,
				signature,
			},
		},
	});
};

export default authenticate;
