import React, { useCallback, useEffect } from "react";
import styled from "styled-components";
import { useLocation, useHistory } from "react-router-dom";

import { RouteName } from "src/utils/routes";
import { Card, HEADER_HEIGHT } from "src/components";
import ReviewCreator from "./components/ReviewCreator";

/*******************************************************************
 *                            **Styles**                           *
 *******************************************************************/
const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 200;

  width: 100vw;
  height: 100vh;
`;

const Container = styled(Card)`
  position: fixed;
  top: ${HEADER_HEIGHT + 20}px;
  right: 50px;
  max-height: 85vh;
  max-width: 900px;
  padding: 40px 60px;

  z-index: 201;
  box-shadow: ${({ theme }) => theme.boxShadow.hover};

  display: flex;
  flex-direction: column;

  &:hover::after,
  &:focus::after {
    opacity: 1;
  }

  & > .loading,
  & > .error {
    margin: auto;
  }

  ${({ theme }) => theme.mediaQueries.medium`
    max-width: 80%;
  `}

  ${({ theme }) => theme.mediaQueries.medium`
    left: 50px;
    right: unset;
  `}

  ${({ theme }) => theme.mediaQueries.xlMobile`
    max-width: 90%;
    padding: 35px 40px;
  `}
`;

const AddReviewModal = () => {
  /**
   * If there is no background (usually when user navigates directly
   * to add review) then by default, show it on the landing page by
   * adding the state manually to set background page to landing.
   */
  const location = useLocation();
  const history = useHistory();
  const onExit = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation(); // prevent default browser back behaviour
      history.goBack();
    },
    [history]
  );
  useEffect(() => {
    const noBackgroundPageSet = !(location.state && location.state.background);
    if (noBackgroundPageSet) {
      const defaultBackgroundPage = {
        pathname: RouteName.LANDING,
      };
      const newLocation = {
        ...location,
        state: {
          background: defaultBackgroundPage,
        },
      };

      history.replace(defaultBackgroundPage);
      history.push(newLocation);
    }
  }, []); // eslint-disable-line

  /**
   * Stop clicks on card bubbling up to background and closing the modal.
   */
  const cardOnClick = useCallback(
    (e: React.MouseEvent) => e.stopPropagation(),
    []
  );

  return (
    <Background onClick={onExit} className="add-review-modal">
      <Container onClick={cardOnClick} color="white">
        <ReviewCreator />
      </Container>
    </Background>
  );
};

export default AddReviewModal;
