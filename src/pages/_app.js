import '../styles/globals.css';
import Provider from '../components/vitals/Provider';
import Header from '../components/vitals/Header';

function MyApp({ Component, pageProps }) {
	return (
		<Provider>
			<div className="wrapper">
				<Header />
				<Component {...pageProps} />
			</div>
		</Provider>
	);
}

export default MyApp;
