import { BigNumber, utils } from 'ethers';
import { indexer } from './indexer';
import createProfileRequest from '../gql/create-profile';

export const createProfile = async (accessToken) => {
	const profileInfo = {
		handle: `agora.${new Date().getTime().toString()}`,
		profilePictureUri: null,
	};
	// request gql
	const createProfileResult = await createProfileRequest(profileInfo, accessToken);

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

	profileInfo.id = BigNumber.from(profileId).toHexString();
	profileInfo.bio = null;
	profileInfo.coverPicture = null;
	profileInfo.location = null;
	profileInfo.name = profileInfo.handle;
	profileInfo.twitterUrl = null;
	profileInfo.website = null;
	profileInfo.picture = null;
	// profileInfo.ownedBy = null;
	// profileInfo.stats = {};
	return profileInfo;
};
