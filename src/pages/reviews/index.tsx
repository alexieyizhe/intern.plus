import React from "react";
import { Redirect } from "react-router-dom";

import { RouteName } from "src/utils/routes";

const ReviewsPage = () => (
  <Redirect to={`${RouteName.FIND}${RouteName.REVIEWS}`} />
);

export default ReviewsPage;
