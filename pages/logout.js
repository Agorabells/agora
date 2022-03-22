import { withSession } from '../lib/server/withSession';

export default function Logout() {
  return (
	  <div>
	  	<h1>Logout</h1>
	  </div>
  )
}

export const getServerSideProps = withSession( async ({ req, res }) => {
	await req.session.destroy();
	res.setHeader('location', '/login');
	res.statusCode = 302;
	res.end();
	return { props: {}}
});
