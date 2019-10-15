import React from "react";
import { Redirect } from "react-router-dom";

import { RouteName } from "src/utils/routes";

/**
 * Redirects to search with a filter of only reviews.
 */
const ReviewsPage = () => (
  <Redirect to={`${RouteName.FIND}${RouteName.REVIEWS}`} />
);

export default ReviewsPage;
