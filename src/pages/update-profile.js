/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react';
import Router from 'next/router';
import { withSession } from '../lib/server/withSession';

export default function UpdateProfile({ user }) {
	const { accessToken, profile } = user;
	const [bio, setBio] = useState(profile?.bio || '');
	const [name, setName] = useState(profile?.name || '');
	const [handle, setHandle] = useState(profile?.handle);
	const [coverPicture, setCoverPicture] = useState(profile?.coverPicture || '');
	const [website, setWebsite] = useState(profile?.website || '');
	const [twitterUrl, setTwitterUrl] = useState(profile?.twitterUrl || '');
	const [location, setLocation] = useState(profile?.location || '');
	const [profilePictureUri, setProfilePictureUri] = useState(profile?.profilePictureUri || '');

	const UpdateProfileInfo = async () => {
		const profileInfo = {
			bio,
			name,
			coverPicture,
			location,
			website,
			twitterUrl,
			profilePictureUri,
		};
		// const res = await updateProfile(profileInfo, accessToken);
		const payload = {
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(profileInfo),
			method: 'POST',
		};
		const resp = await fetch('/api/auth/update-profile', payload);
		const { success } = await resp.json();
	};

	if (profile) {
		return (
			<div className="w-full max-w-s">
				<form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
					<div className="block text-gray-700  font-bold mb-8">Profile Update</div>

					<label className="block text-gray-700 text-sm font-bold mb-2">Address: {user?.address}</label>
					<label className="block text-gray-700 text-sm font-bold mb-2">ID: {profile?.id} </label>
					<label className="block text-gray-700 text-sm font-bold mb-2">Handle: {handle} </label>
					<br />
					<label className="block text-gray-700 text-sm font-bold ">Name: </label>
					<input
						className="shadow appearance-none border rounded w-half py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
						type="text"
						id="name"
						name="name"
						value={name}
						onChange={(e) => {
							setName(e.target.value ? e.target.value : '');
						}}
					/>
					<br />
					<label className="block text-gray-700 text-sm font-bold ">Bio: </label>
					<input
						className="shadow appearance-none border rounded w-half py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
						type="text"
						id="bio"
						name="bio"
						value={bio}
						onChange={(e) => {
							setBio(e.target.value ? e.target.value : '');
						}}
					/>
					<br />
					<label className="block text-gray-700 text-sm font-bold ">Cover picture: </label>
					<input
						className="shadow appearance-none border rounded w-half py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
						type="text"
						disabled
						id="coverPicture"
						name="coverPicture"
						value={coverPicture}
						onChange={(e) => {
							setCoverPicture(e.target.value ? e.target.value : '');
						}}
					/>
					<br />
					<label className="block text-gray-700 text-sm font-bold ">Location: </label>
					<input
						className="shadow appearance-none border rounded w-half py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
						type="text"
						id="location"
						name="location"
						value={location}
						onChange={(e) => {
							setLocation(e.target.value ? e.target.value : '');
						}}
					/>
					<br />
					<label className="block text-gray-700 text-sm font-bold ">Twitter url: </label>
					<input
						className="shadow appearance-none border rounded w-half py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
						type="text"
						id="twitterUrl"
						name="twitterUrl"
						value={twitterUrl}
						onChange={(e) => {
							setTwitterUrl(e.target.value ? e.target.value : '');
						}}
					/>
					<br />
					<label className="block text-gray-700 text-sm font-bold ">Website: </label>
					<input
						className="shadow appearance-none border rounded w-half py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4
"
						type="text"
						id="website"
						name="website"
						value={website}
						onChange={(e) => {
							setWebsite(e.target.value ? e.target.value : '');
						}}
					/>
					<br />
					<br />
					<img
						src={
							profile.profilePictureUri
								? profile.profilePictureUri
								: 'https://storage.googleapis.com/opensea-static/opensea-profile/1.png'
						}
						alt=""
					/>
					<label className="block text-gray-700 text-sm font-bold mb-2">Profile Image: </label>
					<input
						className="shadow appearance-none border rounded w-half py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
						type="text"
						id="profilePictureUri"
						name="profilepicture"
						value={profilePictureUri}
						onChange={(e) => {
							setProfilePictureUri(e.target.value ? e.target.value : '');
						}}
					/>
					<br />
					<br />
					<button
						className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
						onClick={(e) => {
							e.preventDefault();
							UpdateProfileInfo();
						}}
					>
						Update
					</button>
				</form>
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
