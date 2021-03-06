import React from "react";
import { Route, Redirect } from "react-router-dom";

import { useCalculatedLocation } from "src/shared/hooks/useCalculatedLocation";
import { RouteName } from "src/shared/constants/routing";
import { SearchParamKey, SearchType } from "src/shared/constants/search";

import Review from "./page";

/**
 * Page router will either:
 *  - redirect to search with a filter of only reviews
 *  - display a review modal
 */
const ReviewsRouteHandler = () => {
  const calculatedLocation = useCalculatedLocation();

  return (
    <>
      <Route exact path={RouteName.REVIEW}>
        <Review /> {/* this is actually a modal */}
      </Route>

      <Route exact path={RouteName.REVIEWS} location={calculatedLocation}>
        <Redirect
          to={`${RouteName.SEARCH}?${SearchParamKey.TYPE}=${SearchType.REVIEWS}`}
        />
      </Route>
    </>
  );
};

export default ReviewsRouteHandler;
