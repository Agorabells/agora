import { signText, getSignerAddress } from '../ethers.module';
import generateChallenge from './gql/generate-challenge';
import authenticate from './gql/authenticate';

export const loginAuthenticate = async (address = getSignerAddress()) => {
	console.log('generateChallenge');
	const challengeResponse = await generateChallenge(address);
	console.log('signature');

	const signature = await signText(challengeResponse.data.challenge.text);

	const accessTokens = await authenticate(address, signature);
	console.log('accessTokens');

	setAuthenticationToken(accessTokens);
	console.log(accessTokens);

	return accessTokens.data;
};

// setting reusable accessToken
let authenticationToken;
export const setAuthenticationToken = (token) => {
	authenticationToken = token;
	console.log('setAuthenticationToken', token);
};

export const getAuthenticationToken = () => {
	return authenticationToken;
};
