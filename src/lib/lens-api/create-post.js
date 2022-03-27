import { BigNumber, utils } from 'ethers';
// import { loginAuthenticate } from './login-authenticate';
// import { PROFILE_ID } from '../config';
import { getAddressFromSigner, signedTypeData, splitSignature } from '../ethers.module';
import { indexer } from './indexer';
import { uploadIpfs } from '../ipfs';
import { lensHub } from '../lens-hub';

export const createPost = async (postInfo, profileId, address, accesToken) => {
	// const profileId = profileId;
	if (!profileId) {
		throw new Error('Must define PROFILE_ID in the .env to run this');
	}

	// const address = getAddressFromSigner();
	// console.log('create post: address', address);

	// await loginAuthenticate(address);

	// const currencies = await enabledCurrencies();
	console.log('ipfs');
	const ipfsResult = await uploadIpfs();
	console.log('create post: ipfs result', ipfsResult);

	// hard coded to make the code example clear
	const createPostRequest = {
		profileId,
		contentURI: `ipfs://${ipfsResult.path}`,
		collectModule: {
			// feeCollectModule: {
			//   amount: {
			//     currency: currencies.enabledModuleCurrencies.map(
			//       (c: any) => c.address
			//     )[0],
			//     value: '0.000001',
			//   },
			//   recipient: address,
			//   referralFee: 10.5,
			// },
			revertCollectModule: true,
			// limitedFeeCollectModule: {
			//   amount: {
			//     currency: '0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889',
			//     value: '2',
			//   },
			//   collectLimit: '20000',
			//   recipient: '0x3A5bd1E37b099aE3386D13947b6a90d97675e5e3',
			//   referralFee: 0,
			// },
		},
		referenceModule: {
			followerOnlyReferenceModule: false,
		},
	};

	const result = await createPostTypedData(createPostRequest);
	console.log('create post: createPostTypedData', result);

	const { typedData } = result.data.createPostTypedData;
	console.log('create post: typedData', typedData);

	const signature = await signedTypeData(typedData.domain, typedData.types, typedData.value);
	console.log('create post: signature', signature);

	const { v, r, s } = splitSignature(signature);

	const tx = await lensHub.postWithSig({
		profileId: typedData.value.profileId,
		contentURI: typedData.value.contentURI,
		collectModule: typedData.value.collectModule,
		collectModuleData: typedData.value.collectModuleData,
		referenceModule: typedData.value.referenceModule,
		referenceModuleData: typedData.value.referenceModuleData,
		sig: {
			v,
			r,
			s,
			deadline: typedData.value.deadline,
		},
	});
	console.log('create post: tx hash', tx.hash);

	console.log('create post: poll until indexed');
	const indexedResult = await indexer(tx.hash, accesToken);

	console.log('create post: profile has been indexed', indexedResult);

	const { logs } = indexedResult.txReceipt;

	console.log('create post: logs', logs);

	const topicId = utils.id(
		'PostCreated(uint256,uint256,string,address,bytes,address,bytes,uint256)',
	);
	console.log('topicid we care about', topicId);

	const profileCreatedLog = logs.find((l) => l.topics[0] === topicId);
	console.log('create post: created log', profileCreatedLog);

	const profileCreatedEventLog = profileCreatedLog.topics;
	console.log('create post: created event logs', profileCreatedEventLog);

	const publicationId = utils.defaultAbiCoder.decode(['uint256'], profileCreatedEventLog[2])[0];

	console.log('create post: contract publication id', BigNumber.from(publicationId).toHexString());
	console.log(
		'create post: internal publication id',
		`${profileId}-${BigNumber.from(publicationId).toHexString()}`,
	);

	return result.data;
};

// (async () => {
// 	await createPost();
// })();
