import React from "react";
import { ApolloProvider } from "react-apollo";

import client from "src/graphql/client";

const App: React.FC = () => (
  <ApolloProvider client={client}>
    <div className="App">
      <header className="App-header">heya</header>
    </div>
  </ApolloProvider>
);

export default App;
