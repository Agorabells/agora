import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from '@apollo/client'

const APIURL = 'https://api-mumbai.lens.dev/';

const httpLink = new HttpLink({ uri: APIURL });

export function apolloClient(token) {
  const authLink = new ApolloLink((operation, forward) => {
	operation.setContext({
	  headers: {
		'x-access-token': token ? `Bearer ${token}` : '',
	  }
	});
	return forward(operation);
  });
  return new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
  });
}
