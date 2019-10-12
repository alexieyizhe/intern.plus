import ApolloClient from "apollo-boost";

const apiURL = "https://api.8base.com/ck1n1dpxe000201l61fgy5mq8";

const apolloClient = new ApolloClient({
  uri: apiURL,
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
