import '../styles/globals.css'
import Provider from '../elements/vitals/Provider';
import Header from '../elements/vitals/Header';

function MyApp({ Component, pageProps }) {
  return (
	  <Provider>
		  <div className="wrapper">
			  <Header />
			  <Component {...pageProps} />
		  </div>
	  </Provider>
  )
}

export default MyApp
