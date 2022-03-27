import { ethers, utils, Wallet } from 'ethers';
import omitDeep from 'omit-deep';

// let provider;
// if (typeof window.ethereum !== 'undefined' || typeof window.web3 !== 'undefined') {
// 	window.ethereum.enable().then((provider = new ethers.providers.Web3Provider(window.ethereum)));
// }
// export const ethersProvider = new ethers.providers.Web3Provider(window.ethereum);

export async function getProvider() {
	if (typeof window.ethereum !== 'undefined' || typeof window.web3 !== 'undefined') {
		const provider = new ethers.providers.Web3Provider(window.ethereum);

		await provider.send('eth_requestAccounts', []);
		return provider;
	}
}
// export async function getProvider() {
// 	return new ethers.providers.JsonRpcProvider('https://rpc-mumbai.matic.today');
// }

export async function getSigner() {
	// if (typeof window === 'undefined') {
	// server side
	// const privateKey = process.env.PRIVATE_KEY;
	// polygon rpc
	// const privateKey = '';
	const privateKey = '';
	const POLYGON_RPC = 'https://polygon-mumbai.infura.io/v3/611af8c6551c49e8b0717de257bd7d8c';
	// const POLYGON_RPC = 'https://rpc-mumbai.maticvigil.com';

	const provider = new ethers.providers.JsonRpcProvider(POLYGON_RPC);
	// await provider.send('eth_requestAccounts', []);

	const signer = new ethers.Wallet(privateKey, provider);
	return signer;
	// }
	// client side
	/* const provide = window.ethereum;

	const provider = new ethers.providers.Web3Provider(provide);
	return provider.getSigner(); */

	// const provider = await getProvider();
	// return provider.getSigner();
}
export const getAddressFromSigner = () => {
	return getSigner().address;
};

export async function getSignerAddress() {
	const signer = await getSigner();
	const address = await signer.getAddress();
	return address;
}

export async function signText(text) {
	const signer = await getSigner();
	return signer.signMessage(text);
}

export const init = async () => {
	// const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
	// return accounts[0];
};
export const signedTypeData = (domain, types, value) => {
	const signer = getSigner();
	// remove the __typedname from the signature!
	return signer._signTypedData(
		omitDeep(domain, '__typename'),
		omitDeep(types, '__typename'),
		omitDeep(value, '__typename'),
	);
};
export const splitSignature = (signature) => {
	return utils.splitSignature(signature);
};

export const sendTx = async (transaction) => {
	const signer = await getSigner();
	return signer.sendTransaction(transaction);
};
