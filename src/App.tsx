import React from "react";
import { ApolloProvider } from "@apollo/react-hooks";

import apolloClient from "src/graphql/client";
import Ping from "src/components/Ping";

const App: React.FC = () => (
  <ApolloProvider client={apolloClient}>
    <div className="App">
      <Ping />
    </div>
  </ApolloProvider>
);

export default App;
