import {
 ApolloClient, InMemoryCache, HttpLink, ApolloLink,
} from '@apollo/client';
import { getAuthenticationToken } from './login';

// const APIURL = 'https://api-mumbai.lens.dev/';

const httpLink = new HttpLink({ uri: process.env.LENS_API });
console.log('process.env.LENS_API');
console.log(process.env.LENS_API);
export function apolloClient() {
	const token = getAuthenticationToken();

	const authLink = new ApolloLink((operation, forward) => {
		operation.setContext({
			headers: {
				'x-access-token': token ? `Bearer ${token}` : '',
			},
		});
		return forward(operation);
	});
	return new ApolloClient({
		link: authLink.concat(httpLink),
		cache: new InMemoryCache(),
	});
}
