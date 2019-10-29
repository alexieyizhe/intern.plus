import ApolloClient from "apollo-boost";

const apiURL = process.env.REACT_APP_DB_GRAPHQL_API_URL;

const apiClient = new ApolloClient({
  uri: apiURL,
  fetch,
});

export default apiClient;
