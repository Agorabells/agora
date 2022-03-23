import Image from 'next/image';
import style from '../styles/Feeds.module.css';
import { withSession } from '../lib/server/withSession';
import { explore } from '../lib/lens-api/explore-publications';

export default function Feeds({ publications }) {
	console.log(publications);
	return (
		<div>
			<h1>Feeds</h1>
			{publications.items.map((item) => (
				<div className={style.publication} key={item.id}>
					<div className={style.profile}>
						{item.profile?.picture?.original?.url ? (
							<>
								<div>
									<img
										src={item.profile?.picture?.original?.url}
										width={80}
										height={80}
										alt={item?.profile?.name ? item.profile.name : 'unknown'}
									/>
								</div>
								<span>
									<strong>{item?.profile?.name ? item.profile.name : 'unknown'}</strong> - (
									{item?.profile?.ownedBy})
								</span>
							</>
						) : null}
					</div>
					<h1>{item.metadata.content}</h1>
					<span className={style.type}>{item.__typename}</span>
					<span className={style.created}>Created: {item.createdAt}</span>
				</div>
			))}
		</div>
	);
}

export const getServerSideProps = withSession(async ({ req, res }) => {
	if (!req?.session?.user) {
		res.setHeader('location', '/login');
		res.statusCode = 302;
		res.end();
	}
	const { explorePublications } = await explore();
	return {
		props: {
			publications: explorePublications,
		},
	};
});
