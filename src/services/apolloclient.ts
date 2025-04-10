import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import graphqlConfig from "src/config/graphql-config";

const { GRAPHQL_ENDPOINT } = graphqlConfig;

export function createApolloClient(token: string) {
  const httpLink = createHttpLink({
    uri: GRAPHQL_ENDPOINT,
  });

  const authLink = setContext((_, { headers }) => ({
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  }));

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
}
