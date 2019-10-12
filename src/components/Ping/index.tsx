import React from "react";
import { useQuery } from "@apollo/react-hooks";

import { GET_COMPANIES_TEST } from "src/api/queries";
import { GetCompanies } from "src/types/generated/GetCompanies";

const Ping = () => {
  const { loading, error, data } = useQuery<GetCompanies>(GET_COMPANIES_TEST);

  return (
    <>
      <header className="App-header">heya</header>
      {loading && <div>loading...</div>}
      {error && <div>error!</div>}
      {data && <div>server says: {data.sTAGINGCompaniesList.count}</div>}
    </>
  );
};

export default Ping;
