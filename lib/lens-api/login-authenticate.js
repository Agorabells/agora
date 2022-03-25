import { signText, getSignerAddress } from '../ethers.module';
import generateChallenge from './gql/generate-challenge';
import authenticate from './gql/authenticate';

export const loginAuthenticate = async () => {
	const address = await getSignerAddress();
	console.log('generateChallenge');
	console.log(address);

	const challengeResponse = await generateChallenge(address);
	console.log('signature');

	const signature = await signText(challengeResponse.data.challenge.text);

	const accessTokens = await authenticate(address, signature);
	console.log('accessTokens');

	console.log(accessTokens);

	return accessTokens.data;
};
