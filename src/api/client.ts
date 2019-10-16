import ApolloClient from "apollo-boost";

const apiURL = process.env.REACT_APP_DB_GRAPHQL_API_URL;

const apolloClient = new ApolloClient({
  uri: apiURL, // TODO: uncomment if we need to fetch actual data
  fetch,
  // TODO: add API token for local dev to be able to CRUD everything
  // request: operation => {
  //   operation.setContext({
  //     headers: {
  //       authorization: `Bearer ${process.env.8baseAPIToken}`,
  //     },
  //   });
  // },
});

export default apolloClient;
