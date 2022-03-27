import { ethers } from 'ethers';

import { getSigner } from './ethers.module';
// docs.lens.dev/docs/testnet-addresses
// lens contract info can all be found on the deployed
// contract address on polygon.
// not defining here as it will bloat the code example
const LENS_HUB_CONTRACT = '0xd7b3481de00995046c7850bce9a5196b7605c367';
const LENS_HUB_ABI = 'https://api-mumbai.lens.dev/';

// lens contract info can all be found on the deployed
// contract address on polygon.
export const lensHub = ethers.Contract('0xd7b3481de00995046c7850bce9a5196b7605c367', getSigner());
