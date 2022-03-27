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
				<div className={style.profile}>
					<div>
						<a href={`/profiles/${item.profile.id}/`}>
							<img
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
						<span>
							<strong>{item?.profile?.name ? item.profile.name : 'unknown'}</strong> -
							({item?.profile?.ownedBy})
						</span>{' '}
					</a>
				</div>
				<h1>{item.metadata.content}</h1>
				<h4>{item.metadata.content}</h4>
				<span className={style.type}>{item.__typename}</span>
				{/* <span className={style.created}>Created: {item.createdAt}</span> */}
				<span className={style.created}>
					comments : {item.stats.totalAmountOfComments}
				</span>
			</div>
		);
	}

	return (
		<div>
			<h1>Feed</h1>
			{publications.map((item, ind) => (
				// eslint-disable-next-line react/no-array-index-key
				<PublicationItem item={item} key={ind} />
			))}
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
