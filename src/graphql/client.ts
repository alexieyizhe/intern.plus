import ApolloClient from "apollo-boost";

export const clientURI = "/.netlify/functions/graphql";

const apolloClient = new ApolloClient({
  uri: clientURI,
});

export default apolloClient;
