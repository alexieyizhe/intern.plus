import React from "react";

import { withLoadingPage } from "src/shared/utils/withLoadingPage";

const Search = React.lazy(
  () => import(/* webpackChunkName: "search" */ "./SearchPage")
);

export default withLoadingPage(Search);
