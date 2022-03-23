import { gql } from '@apollo/client/core';
import { BigNumber, utils } from 'ethers';
import { apolloClient } from './apollo-client';
import { indexer } from './indexer';

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

const createProfileRequest = (token) => {
	return apolloClient(token).mutate({
		mutation: gql(CREATE_PROFILE),
		variables: {
			request: createProfileRequest,
		},
	});
};

export const createProfile = async (token) => {
	const createProfileResult = await createProfileRequest(
		{
			handle: new Date().getTime().toString(),
		},
		token,
	);

	const result = await indexer(createProfileResult.data.createProfile.txHash, token);
	console.log('create profile: profile has been indexed', result);

	const { logs } = result.txReceipt;

	console.log('create profile: logs', logs);

	const topicId = utils.id(
		'ProfileCreated(uint256,address,address,string,string,address,bytes,string,uint256)',
	);
	console.log('topicid we care about', topicId);

	const profileCreatedLog = logs.find((l) => l.topics[0] === topicId);
	console.log('profile created log', profileCreatedLog);

	const profileCreatedEventLog = profileCreatedLog.topics;
	console.log('profile created event logs', profileCreatedEventLog);

	const profileId = utils.defaultAbiCoder.decode(['uint256'], profileCreatedEventLog[1])[0];

	console.log('profile id', BigNumber.from(profileId).toHexString());

	return result.data;
};
