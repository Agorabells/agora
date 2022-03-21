import { ethers } from 'ethers';


export async function getProvider() {
	if (window.ethereum) {
		const provider = new ethers.providers.Web3Provider(window.ethereum);
		await provider.send('eth_requestAccounts', []);
		return provider;
	}
}

export async function getSigner() {
	const provider = await getProvider();
	return provider.getSigner();
}

export async function getSignerAddress() {
	const signer = await getSigner();
	const address = await signer.getAddress();
	return address;
}

export async function signText(text) {
	const signer = await getSigner();
	return signer.signMessage(text);
}
