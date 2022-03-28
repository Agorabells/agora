/* eslint-disable react/no-unstable-nested-components */
import Image from 'next/image';
import style from '../styles/Feeds.module.css';
import { withSession } from '../lib/server/withSession';
import { explore } from '../lib/lens-api/explore-publications';

export default function Feeds({ publications }) {
	function PublicationItem(props) {
		const { item } = props;
		console.log(item);

		return (
			<div className={style.publication} key={item.id}>
				<div className="flex">
					<div className="mb-6">
						<a href={`/profiles/${item.profile.id}/`}>
							<img
								className="overflow-hidden rounded-full mr-4 w-20 h-20"
								src={
									item.profile.picture && item.profile.picture.original.url
										? item.profile.picture.original.url
										: 'https://storage.googleapis.com/opensea-static/opensea-profile/1.png'
								}
								width={80}
								height={80}
								alt={item?.profile?.name ? item.profile.name : 'unknown'}
							/>
						</a>
					</div>
					<a href={`/profiles/${item.profile.id}/`}>
						<div className="hover:text-accent-200 ease-in-out duration-150 font-semibold tracking-wide mr-2">
							{item?.profile?.name ? item.profile.name : 'unknown'}
							<span className="italic font-light ml-2">
								({item?.profile?.handle}){' '}
							</span>
						</div>
						<div>{item?.profile?.ownedBy}</div>
					</a>
				</div>
				<h4 className="text-md leading-6 line-clamp-3 mb-6">
					{item.metadata.content}
				</h4>
				<span className={style.type}>{item.__typename}</span>
				{/* <span className={style.created}>Created: {item.createdAt}</span> */}

				<a href={`/post-nft/${item.id}/`}>
					<span className={style.created}>
						comments : {item.stats.totalAmountOfComments}
					</span>
				</a>
			</div>
		);
	}

	return (
		<div>
			<h1 className="font-bold">Feed</h1>
			<div className="grid grid-cols-2 gap-6">
				{publications.map((item, ind) => (
					// eslint-disable-next-line react/no-array-index-key
					<PublicationItem item={item} key={ind} />
				))}
			</div>
		</div>
	);
}

export const getServerSideProps = withSession(async ({ req, res }) => {
	const { explorePublications } = await explore(req);

	const arr = explorePublications.items.filter(
		(item) => item.__typename !== 'Comment',
	);
	return {
		props: {
			publications: arr,
		},
	};
});
