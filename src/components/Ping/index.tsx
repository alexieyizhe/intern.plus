import React from "react";
import { useQuery } from "@apollo/react-hooks";

import { GET_PING } from "src/graphql/queries";

const Ping = () => {
  const { loading, error, data } = useQuery(GET_PING);

  return (
    <>
      <header className="App-header">heya</header>
      {loading && <div>loading...</div>}
      {error && <div>error!</div>}
      {data && <div>server says: {data.ping}</div>}
    </>
  );
};

export default Ping;
