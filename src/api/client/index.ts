import ApolloClient from "apollo-boost";

const apolloClient = new ApolloClient({
  uri: "/api/graphql",
  fetch,
});

export default apolloClient;
