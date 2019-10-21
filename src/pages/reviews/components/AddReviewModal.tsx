import React from "react";
import styled from "styled-components";

import { useSiteContext } from "src/utils/context";

import { Card, Text, HEADER_HEIGHT } from "src/components";

/*******************************************************************
 *                            **Styles**                           *
 *******************************************************************/
const Container = styled(Card)`
  position: fixed;
  top: ${HEADER_HEIGHT + 20}px;
  right: 50px;
  max-height: 85vh;
  max-width: 900px;
  padding: 35px 40px;
  
  display: flex;
  flex-direction: column;

  z-index: ${({ theme }) => theme.zIndex.modal};
  box-shadow: ${({ theme }) => theme.boxShadow.hover};

  transition: all 150ms ease-out;
  opacity: 0;
  pointer-events: none;
  transform: translateY(10px);
  &.open {
    opacity: 1;
    pointer-events: auto;
    transform: translateY(0);
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
    padding: 20px 30px;
  `}
`;

/*******************************************************************
 *                           **Component**                         *
 *******************************************************************/
const AddReviewModal: React.FC = () => {
  const {
    state: { addReviewModalOpen: modalOpen, mobileMenuOpen },
  } = useSiteContext();

  return (
    <Container
      className={`
        ${modalOpen ? "open" : ""} 
        ${mobileMenuOpen ? "mobileMenuOpen" : ""}
      `}
      aria-hidden={modalOpen ? "false" : "true"}
      color="white"
    >
      <Text variant="subheading" color="error">
        Adding reviews isn't currently supported, but is coming soon!
      </Text>
    </Container>
  );
};

export default React.memo(AddReviewModal);
