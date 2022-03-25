import { signText, getSignerAddress } from '../ethers.module';
import generateChallenge from './gql/generate-challenge';
import authenticate from './gql/authenticate';
import getProfilesRequest from './gql/get-profiles-request';

export const loginAuthenticate = async (address = getSignerAddress()) => {
	// // get user profile if exist
	// const profiles = await getProfilesRequest({ ownedBy: [address], limit: 10 });

	console.log('generateChallenge');
	console.log(address);

	const challengeResponse = await generateChallenge(address);
	console.log('signature');

	const signature = await signText(challengeResponse.data.challenge.text);

	const accessTokens = await authenticate(address, signature);
	console.log('accessTokens');

	console.log(accessTokens);

	return accessTokens.data.authenticate.accessToken;
};
