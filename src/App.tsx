import React from "react";
import { ApolloProvider } from "@apollo/react-hooks";

import apolloClient from "src/api/client";

const App: React.FC = () => (
  <ApolloProvider client={apolloClient}>
    <div className="App">
      <div>sup this is tugboat</div>
    </div>
  </ApolloProvider>
);

export default App;
