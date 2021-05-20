import ApolloClient from "apollo-boost";

const apiURL =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_DB_GRAPHQL_API_URL
    : "http://localhost:8000/graphql";
const apiClient = new ApolloClient({
  uri: "/api/graphql",
  fetch,
});

/**
 * Gets the correct client based on the environment.
 * Asynchronous so development test code can be split
 * out of production bundle.
 */
const client = Promise.resolve(apiClient);

export default client;
