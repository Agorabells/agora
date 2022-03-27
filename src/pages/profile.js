import Router from 'next/router';
import { withSession } from '../lib/server/withSession';

export default function Profile({ user }) {
	const { profile } = user;

	const editProfile = async () => {
		if (profile?.handle) {
			Router.push('/update-profile');
		}
	};
	if (profile) {
		return (
			<div className="container mx-auto my-5 p-5">
				<div className="md:flex no-wrap md:-mx-2 ">
					<div className="w-full md:w-5/12 md:mx-2">
						<h3 className="block text-gray-700  font-bold mb-2">Profile Page</h3>
						<div className="px-4 py-2 ">User profile authenticated and created via Lens protocol</div>
						<div className="bg-white p-3 border-t-4 border-green-400">
							<div className="image overflow-hidden">
								<img
									className="h-auto w-half mx-auto   hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center
"
									src={
										profile.profilePictureUri
											? profile.profilePictureUri
											: 'https://storage.googleapis.com/opensea-static/opensea-profile/1.png'
									}
									alt=""
								/>
							</div>
							<h1 className="text-gray-900 font-bold text-xl leading-8 my-1">{user?.address}</h1>
							<div className="text-gray-600 font-lg text-semibold leading-6">
								<span className=" py-2 font-semibold"> ID :</span> {profile?.id}
							</div>
							<div className="text-gray-600 font-lg text-semibold leading-6">
								<span className=" py-2 font-semibold"> Handle :</span> {profile?.handle}
							</div>
						</div>
					</div>
				</div>
				<div className="bg-white p-3 shadow-sm rounded-sm">
					<div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
						<span clas="text-green-500">
							<svg
								className="h-5"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
								/>
							</svg>
						</span>
						<span className="tracking-wide">About</span>
					</div>
					<div className="text-gray-700">
						<div className="grid md:grid-cols-2 text-sm">
							<div className="grid grid-cols-2">
								<div className="px-4 py-2 font-semibold">Name</div>
								<div className="px-4 py-2">{profile?.name}</div>
							</div>
							<div className="grid grid-cols-2">
								<div className="px-4 py-2 font-semibold">twitter</div>
								<div className="px-4 py-2">
									<a className="text-blue-800" href={profile?.twitterUrl}>
										{profile?.twitterUrl}
									</a>
								</div>
							</div>
							<div className="grid grid-cols-2">
								<div className="px-4 py-2 font-semibold">Location</div>
								<div className="px-4 py-2">{profile?.location}</div>
							</div>
							<div className="grid grid-cols-2">
								<div className="px-4 py-2 font-semibold">Website</div>
								<div className="px-4 py-2">
									<a className="text-blue-800" href={profile?.website}>
										{profile?.website}
									</a>
								</div>
							</div>
						</div>
					</div>
					<button
						className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
						onClick={(e) => {
							e.preventDefault();

							editProfile();
						}}
					>
						Edit Profile
					</button>
				</div>
			</div>
		);
	}
	return <div>user not login</div>;
}

export const getServerSideProps = withSession(({ req, res }) => {
	if (!req?.session?.user) {
		res.setHeader('location', '/login');
		res.statusCode = 302;
		res.end();
	}

	return {
		props: {
			user: req?.session?.user,
		},
	};
});
