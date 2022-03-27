import { create } from 'ipfs-http-client';
import { v4 as uuidv4 } from 'uuid';

const client = create({
	host: 'ipfs.infura.io',
	port: 5001,
	protocol: 'https',
});

export const uploadIpfs = async () => {
	console.log('uploadIpfs');
	console.log('uploadIpfs');
	const result = await client.add(
		JSON.stringify({
			version: '1.0.0',
			metadata_id: uuidv4(),
			description: 'Agora Description',
			content: 'Agora Content',
			external_url: null,
			image: null,
			imageMimeType: null,
			name: 'Agora Name',
			attributes: [],
			media: [
				// {
				//   item: 'https://scx2.b-cdn.net/gfx/news/hires/2018/lion.jpg',
				//   type: 'image/jpeg',
				// },
			],
		}),
	);

	console.log('upload result ipfs', result);
	return result;
};
