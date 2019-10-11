import React from "react";
import { useQuery } from "@apollo/react-hooks";

import { GET_COMPANIES } from "src/graphql/queries";

const Test = () => {
  const { loading, error, data } = useQuery(GET_COMPANIES);

  return (
    <>
      <header className="App-header">heya</header>
      {loading && <div>loading...</div>}
      {error && <div>error!</div>}
      {data && (
        <div>server says: {data.companies && data.companies.length}</div>
      )}
    </>
  );
};

export default Test;
