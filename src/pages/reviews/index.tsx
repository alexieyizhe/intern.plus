import React, { useEffect } from "react";
import {
  Switch,
  Route,
  useRouteMatch,
  useLocation,
  useHistory,
  match,
} from "react-router-dom";
import { PageContainer } from "src/components";
import { RouteName } from "src/utils/routes";
import styled from "styled-components";

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 200;

  width: 100vw;
  height: 100vh;

  background-color: grey;
  opacity: 0.4;
`;

const ReviewsPage = () => {
  /**
   * If there is no background (usually when user navigated directly
   * to a review) then by default, show it on the landing page by
   * adding the state manually to set background page to landing.
   */
  const location = useLocation();
  const history = useHistory();
  useEffect(() => {
    const noBackgroundPageSet = !(location.state && location.state.background);
    if (noBackgroundPageSet) {
      const locationWithDefaultLandingBackground = {
        ...location,
        state: {
          background: {
            pathname: RouteName.LANDING,
          },
        },
      };

      history.replace(locationWithDefaultLandingBackground);
    }
  }, []); // eslint-disable-line

  return <Background />;
};

export default ReviewsPage;
