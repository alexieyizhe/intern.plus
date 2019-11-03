import React from "react";
import { Redirect } from "react-router-dom";

import { RouteName } from "src/shared/constants/routing";
import { SearchParamKey, SearchType } from "src/shared/constants/search";

/**
 * Redirects to search with a filter of only reviews.
 */
const ReviewsPage = () => (
  <Redirect
    to={`${RouteName.SEARCH}?${SearchParamKey.TYPE}=${SearchType.REVIEWS}`}
  />
);

export default ReviewsPage;
