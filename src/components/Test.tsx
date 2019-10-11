import React from "react";
import { useQuery } from "@apollo/react-hooks";

import { GET_TEST } from "src/graphql/queries";

const Test = () => {
  const { loading, error, data } = useQuery(GET_TEST);

  return (
    <>
      <header className="App-header">heya</header>
      {loading && <div>loading...</div>}
      {error && <div>error!</div>}
      {data && <div>server says: {data.hello}</div>}
    </>
  );
};

export default Test;
