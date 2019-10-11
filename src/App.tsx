import React from "react";
import { ApolloProvider } from "@apollo/react-hooks";

import client from "src/graphql/client";
import Test from "src/components/Test";

const App: React.FC = () => (
  <ApolloProvider client={client}>
    <div className="App">
      <Test />
    </div>
  </ApolloProvider>
);

export default App;
