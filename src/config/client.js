import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from 'apollo-boost';
import { GRAPHQL_URL } from '.';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { onError } from 'apollo-link-error';
import { setContext } from 'apollo-link-context';
import { split } from 'apollo-link';
import { getAuthToken } from '../utility/Auth';

const httpLink = new HttpLink({
  uri: `${GRAPHQL_URL}`,
});

const wsLink = new WebSocketLink({
  uri: `ws://${GRAPHQL_URL}`,
  options: { reconnect: true },
});

const authLink = setContext(async (_, { headers }) => {
  //console.log(isAuth());
  const token = getAuthToken();
  if (token) {
    return {
      headers: {
        ...headers,
        Authorization: token,
      },
    };
  }
});

const httpAuthLink = authLink.concat(httpLink);

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) =>
      // eslint-disable-next-line no-console
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );
  }
  // eslint-disable-next-line no-console
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpAuthLink,
);

const client = new ApolloClient({
  link: ApolloLink.from([errorLink, link]),
  //link: httpLink,
  cache: new InMemoryCache(),
  name: 'InfatuNation',
  version: '0.1',
});

export default client;
