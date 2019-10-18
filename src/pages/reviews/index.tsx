import React from "react";
import { Redirect } from "react-router-dom";

import { RouteName } from "src/utils/routes";
import { TYPE_FILTER, SearchType } from "src/pages/search";

/**
 * Redirects to search with a filter of only reviews.
 */
const ReviewsPage = () => (
  <Redirect to={`${RouteName.FIND}?${TYPE_FILTER}=${SearchType.REVIEWS}`} />
);

export default ReviewsPage;
