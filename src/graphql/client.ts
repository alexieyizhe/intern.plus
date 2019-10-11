import ApolloClient from "apollo-boost";

export const clientURI = "/.netlify/functions/graphql";

const client = new ApolloClient({
  uri: clientURI,
});

export default client;
