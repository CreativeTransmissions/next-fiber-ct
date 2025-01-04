import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: 'https://graphql-prod.deso.com/graphql',
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          posts: {
            merge(existing = { nodes: [] }, incoming = { nodes: [] }) {
              return {
                ...incoming,
                nodes: [...existing.nodes, ...incoming.nodes].filter((post, index, self) =>
                  index === self.findIndex((p) => p.postHash === post.postHash)
                ),
              };
            },
          },
        },
      },
    },
  }),
});
