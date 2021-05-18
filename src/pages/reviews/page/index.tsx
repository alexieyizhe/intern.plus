import React from "react";

import { withLoadingPage } from "src/shared/utils/withLoadingPage";

const Review = React.lazy(
  () => import(/* webpackChunkName: "review" */ "./ReviewPage")
);

export default withLoadingPage(Review);
