import ApolloClient from "apollo-boost";

const apiURL = process.env.REACT_APP_DB_GRAPHQL_API_URL;

const apolloClient = new ApolloClient({
  uri: apiURL,
  fetch,
});

export default apolloClient;
