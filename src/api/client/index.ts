import { InMemoryCache, ApolloClient } from "@apollo/client";

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "/api/graphql",
});

export default apolloClient;
