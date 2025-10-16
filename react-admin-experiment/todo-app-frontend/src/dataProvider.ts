import buildGraphQLProvider from 'ra-data-graphql-simple';
import { ApolloClient, InMemoryCache, HttpLink, ApolloLink, gql } from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';

const httpLink = new HttpLink({
  uri: 'http://localhost:8000/graphql',
});

const wsClient = createClient({
  url: 'ws://localhost:8000/graphql',
  lazy: false, // Connect immediately
});

const wsLink = new GraphQLWsLink(wsClient);

const splitLink = ApolloLink.split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink
);

const apolloClient = new ApolloClient({
  link: splitLink, // Use split link for both HTTP and WebSocket
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          // Generic merge policy for all list queries
          // This prevents Apollo from trying to merge paginated results
          merge(_existing, incoming) {
            return incoming;
          },
        },
      },
    },
  }),
});

export const buildDataProvider = async () => {
  return buildGraphQLProvider({
    client: apolloClient as any, // Type compatibility workaround
  });
};

export { apolloClient, gql };
