import {
 ApolloClient, InMemoryCache, HttpLink, ApolloLink,
} from '@apollo/client';

// const LENS_API = 'https://api-mumbai.lens.dev/';
// console.log('process.env.LENS_API');

const httpLink = new HttpLink({ uri: 'https://api-mumbai.lens.dev/' });

export function apolloClient(token) {
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
