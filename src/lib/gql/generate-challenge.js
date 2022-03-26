import { gql } from '@apollo/client/core';
import { apolloClient } from '../apollo-client';
// https://docs.lens.dev/docs/login
// https://github.com/aave/lens-api-examples/
const GET_CHALLENGE = `
  query($request: ChallengeRequest!) {
    challenge(request: $request) { text }
  }
`;

const generateChallenge = (address) => {
	return apolloClient().query({
		query: gql(GET_CHALLENGE),
		variables: {
			request: {
				address,
			},
		},
	});
};

export default generateChallenge;
