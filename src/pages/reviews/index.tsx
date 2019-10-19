import React from "react";
import { Redirect } from "react-router-dom";

import { RouteName } from "src/utils/constants";
import { SearchFilter, SearchType } from "src/utils/constants";

/**
 * Redirects to search with a filter of only reviews.
 */
const ReviewsPage = () => (
  <Redirect
    to={`${RouteName.SEARCH}?${SearchFilter.TYPE}=${SearchType.REVIEWS}`}
  />
);

export default ReviewsPage;
