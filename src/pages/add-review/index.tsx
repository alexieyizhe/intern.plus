import React, { useCallback, useEffect, useRef } from "react";
import styled from "styled-components";
import { useLocation, useHistory } from "react-router-dom";

import { RouteName } from "src/utils/constants";
import { useOnClickOutside } from "src/utils/hooks/useOnClickOutside";

import { Card, Text, HEADER_HEIGHT } from "src/components";
import ReviewCreator from "./components/ReviewCreator";

/*******************************************************************
 *                            **Styles**                           *
 *******************************************************************/
const Container = styled(Card)`
  position: fixed;
  top: ${HEADER_HEIGHT + 20}px;
  right: 50px;
  max-height: 85vh;
  max-width: 900px;
  padding: 0;
  
  display: flex;
  flex-direction: column;

  box-shadow: ${({ theme }) => theme.boxShadow.hover};

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

const Disabled = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 40px 60px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

/*******************************************************************
 *                           **Component**                         *
 *******************************************************************/
const AddReviewModal = () => {
  /**
   * If there is no background (usually when user navigates directly
   * to add review) then by default, show it on the landing page by
   * adding the state manually to set background page to landing.
   */
  const location = useLocation();
  const history = useHistory();
  const closeModal = useCallback(
    (e: MouseEvent | TouchEvent) => {
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
   * Detect if a click outside the header has happened and if it has,
   * close the mobile menu.
   */
  const modalRef = useRef<HTMLDivElement | null>(null);
  useOnClickOutside(modalRef, closeModal);

  return (
    <Container color="white">
      <Disabled ref={modalRef}>
        <Text variant="subheading" color="error">
          Adding reviews isn't currently supported, but is coming soon!
        </Text>
      </Disabled>
    </Container>
  );
};

export default AddReviewModal;
