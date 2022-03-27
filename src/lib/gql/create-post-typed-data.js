import { gql } from '@apollo/client/core';
import { apolloClient } from '../apollo-client';
// https://docs.lens.dev/docs/create-post-typed-data
// https://github.com/aave/lens-api-examples/

const CREATE_POST_TYPED_DATA = `
  mutation($request: CreatePublicPostRequest!) { 
    createPostTypedData(request: $request) {
      id
      expiresAt
      typedData {
        types {
          PostWithSig {
            name
            type
          }
        }
      domain {
        name
        chainId
        version
        verifyingContract
      }
      value {
        nonce
        deadline
        profileId
        contentURI
        collectModule
        collectModuleData
        referenceModule
        referenceModuleData
      }
    }
  }
}
`;

// TODO typings
const createPostTypedData = (createPostTypedDataRequest, accesToken) => {
	return apolloClient(accesToken).mutate({
		mutation: gql(CREATE_POST_TYPED_DATA),
		variables: {
			request: createPostTypedDataRequest,
		},
	});
};
export default createPostTypedData;
