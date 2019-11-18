import ApolloClient from "apollo-boost";

const apiURL = process.env.REACT_APP_DB_GRAPHQL_API_URL;
const apiClient = new ApolloClient({
  uri: apiURL,
  fetch,
});

const client =
  process.env.NODE_ENV === "production"
    ? Promise.resolve(apiClient)
    : import(/* webpackChunkName: "mock" */ "./mock").then(
        mock => mock.default
      );

export default client;
