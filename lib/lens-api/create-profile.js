import { BigNumber, utils } from 'ethers';
import { indexer } from './indexer';
import createProfileRequest from './gql/create-profile-request';

export const createProfile = async (accessToken) => {
	// request gql
	const createProfileResult = await createProfileRequest(
		{
			handle: `tiana${new Date().getTime().toString()}`,
			profilePictureUri: null,
		},
		accessToken,
	);

	const result = await indexer(createProfileResult.data.createProfile.txHash, accessToken);
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
