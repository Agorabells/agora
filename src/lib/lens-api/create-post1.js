import { signedTypeData, getAddressFromSigner, splitSignature } from '../ethers.module';
import { createPostTypedData } from '../gql/create-post-typed-data';
import { lensHub } from '../lens-hub';

export const createPost = async () => {
	// hard coded to make the code example clear
	const createPostRequest = {
		profileId: '0x03',
		contentURI: 'ipfs://QmPogtffEF3oAbKERsoR4Ky8aTvLgBF5totp5AuF8YN6vl.json',
		collectModule: {
			emptyCollectModule: true,
			// timedFeeCollectModule: {
			//     amount: {
			//        currency: "0xD40282e050723Ae26Aeb0F77022dB14470f4e011",
			//        value: "0.01"
			//      },
			//      recipient: "0x72e51d5ab16bcf0436b7e02a62c084f58c375f4f",
			//      referralFee: 10.5
			//  }
		},
		referenceModule: {
			followerOnlyReferenceModule: false,
		},
	};

	const result = await createPostTypedData(createPostRequest);
	const { typedData } = result.data.createPostTypedData;

	const signature = await signedTypeData(typedData.domain, typedData.types, typedData.value);
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
	console.log(tx.hash);
	// 0x64464dc0de5aac614a82dfd946fc0e17105ff6ed177b7d677ddb88ec772c52d3
	// you can look at how to know when its been indexed here:
	//   - https://docs.lens.dev/docs/has-transaction-been-indexed
};
