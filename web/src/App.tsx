import { FatalErrorBoundary } from "@redwoodjs/web";
import { RedwoodApolloProvider } from "@redwoodjs/web/apollo";

import FatalErrorPage from "src/pages/FatalErrorPage/FatalErrorPage";
import Routes from "src/Routes";

import "./index.css";
import "./scaffold.css";

const App = () => (
  <FatalErrorBoundary page={FatalErrorPage}>
    <RedwoodApolloProvider>
      <Routes />
    </RedwoodApolloProvider>
  </FatalErrorBoundary>
);

export default App;
