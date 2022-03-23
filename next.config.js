/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: ['ipfs.infura.io', 'lh3.googleusercontent.com'],
	},
};

module.exports = nextConfig;
