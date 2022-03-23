import { gql } from '@apollo/client/core';
import { apolloClient } from './apollo-client';

const HAS_TX_BEEN_INDEXED = `
  query($request: HasTxHashBeenIndexedRequest!) {
    hasTxHashBeenIndexed(request: $request) { 
	    ... on TransactionIndexedResult {
            indexed
            txReceipt {
                to
                from
                contractAddress
                transactionIndex
                root
                gasUsed
                logsBloom
                blockHash
                transactionHash
                blockNumber
                confirmations
                cumulativeGasUsed
                effectiveGasPrice
                byzantium
                type
                status
                logs {
                    blockNumber
                    blockHash
                    transactionIndex
                    removed
                    address
                    data
                    topics
                    transactionHash
                    logIndex
                }
            }
            metadataStatus {
              status
              reason
            }
        }
        ... on TransactionError {
            reason
            txReceipt {
                to
                from
                contractAddress
                transactionIndex
                root
                gasUsed
                logsBloom
                blockHash
                transactionHash
                blockNumber
                confirmations
                cumulativeGasUsed
                effectiveGasPrice
                byzantium
                type
                status
                logs {
                    blockNumber
                    blockHash
                    transactionIndex
                    removed
                    address
                    data
                    topics
                    transactionHash
                    logIndex
             }
            }
        },
        __typename
    }
  }
`;

const hasTxBeenIndexed = (txHash, token) => {
	return apolloClient(token).query({
		query: gql(HAS_TX_BEEN_INDEXED),
		variables: {
			request: {
				txHash,
			},
		},
		fetchPolicy: 'network-only',
	});
};

export const indexer = async (txHash, token) => {
	while (true) {
		const result = await hasTxBeenIndexed(txHash, token);

		const response = result.data.hasTxHashBeenIndexed;
		if (response.__typename === 'TransactionIndexedResult') {
			console.log('pool until indexed: indexed', response.indexed);
			console.log('pool until metadataStatus: metadataStatus', response);

			if (response.metadataStatus) {
				if (response.metadataStatus.status === 'SUCCESS') {
					return response;
				}

				if (response.metadataStatus.status === 'METADATA_VALIDATION_FAILED') {
					throw new Error(response.metadataStatus.reason);
				}
			} else {
				if (response.indexed) {
					return response;
				}
			}

			// sleep for a second before trying again
			const sleep = () => {
				return new Promise((y, x) => {
					setTimeout(() => {
						y(true);
					}, 1500);
				});
			};
			await sleep(1500);
		} else {
			// it got reverted and failed!
			return response;
			// console.log(response);
			// throw new Error(response.reason);
		}
	}
};
