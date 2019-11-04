import ApolloClient from "apollo-boost";
import { mockClient } from "./mock";

const apiURL = process.env.REACT_APP_DB_GRAPHQL_API_URL;
const apiClient = new ApolloClient({
  uri: apiURL,
  fetch,
});

const client = process.env.NODE_ENV === "development" ? apiClient : mockClient;

export default client;
