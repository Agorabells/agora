/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react';
import Router from 'next/router';
import { withSession } from '../lib/server/withSession';

export default function UpdateProfile({ user }) {
	const { profile } = user;
	const [content, setContent] = useState('');
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [externalURL, setExternalURL] = useState('');

	const createPost = async () => {
		const PostInfo = {
			content,
			name,
			description,
			externalURL,
		};
		const payload = {
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(PostInfo),
			method: 'POST',
		};
		const resp = await fetch('/api/auth/create-post', payload);
		const { success } = await resp.json();
		console.log('success');
		console.log(resp.json());
	};

	if (profile) {
		return (
			<div className="w-full max-w-s">
				<form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
					<div className="block text-gray-700  font-bold mb-8">Create New Post</div>
					<br />
					<label className="block text-gray-700 text-sm font-bold mb-2">Name </label>
					<input
						className="shadow appearance-none border rounded w-half py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						type="text"
						id="name"
						name="name"
						value={name}
						onChange={(e) => {
							setName(e.target.value ? e.target.value : '');
						}}
					/>
					<br />
					<label className="block text-gray-700 text-sm font-bold mb-2">Description </label>
					<input
						className="shadow appearance-none border rounded w-half py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						type="text"
						id="description"
						name="description"
						value={description}
						onChange={(e) => {
							setDescription(e.target.value ? e.target.value : '');
						}}
					/>
					<br />
					<br />
					<label className="block text-gray-700 text-sm font-bold mb-2">Content </label>
					<textarea
						className="shadow appearance-none border rounded w-half py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						type="text"
						id="content"
						name="content"
						value={content}
						onChange={(e) => {
							setContent(e.target.value ? e.target.value : '');
						}}
					/>
					<br />
					<br />
					<label className="block text-gray-700 text-sm font-bold mb-2"> URL </label>
					<input
						className="shadow appearance-none border rounded w-half py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						type="text"
						id="url"
						name="url"
						value={externalURL}
						onChange={(e) => {
							setExternalURL(e.target.value ? e.target.value : '');
						}}
					/>
					<br />
					<br />
					<button
						className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
						onClick={(e) => {
							e.preventDefault();
							createPost();
						}}
					>
						Save Post
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
