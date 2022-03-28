import NextNProgress from 'nextjs-progressbar';
import '../styles/globals.css';
import Provider from '../components/vitals/Provider';
import Header from '../components/vitals/Header';

function MyApp({ Component, pageProps }) {
	return (
		<Provider>
			<NextNProgress />
			<div className="wrapper">
				<Header />
				<Component {...pageProps} />
			</div>
		</Provider>
	);
}

export default MyApp;
