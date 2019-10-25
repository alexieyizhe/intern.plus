import React from "react";
import styled from "styled-components";

import { useSiteContext } from "src/utils/context";

import {
  HEADER_HEIGHT,
  MOBILE_MENU_MEDIA_QUERY,
  Card,
  Text,
} from "src/components";

/*******************************************************************
 *                            **Styles**                           *
 *******************************************************************/
const ModalContainer = styled.div`
  position: fixed;
  width: 100%;
  top: ${HEADER_HEIGHT}px;

  z-index: ${({ theme }) => theme.zIndex.modal};
`;

const InnerModalContainer = styled.div`
  position: relative;
  margin: auto;
  max-width: ${({ theme }) => theme.maxWidth.page}px;
  padding: ${({ theme }) =>
    `${theme.padding.pageVertical}px ${theme.padding.pageHorizontal}px`};

  ${({ theme }) => theme.mediaQueries[MOBILE_MENU_MEDIA_QUERY]`
    padding: ${theme.padding.pageVertical}px ${theme.padding.pageHorizontalMobile}px;
  `}
`;

const InnerContainer = styled(Card)`
  position: relative;
  margin-left: auto;
  max-height: 85vh;
  max-width: 500px;

  display: flex;
  flex-direction: column;

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

  ${({ theme }) => theme.mediaQueries.xlMobile`
    margin: auto;  
    right: unset;
    max-width: 100%;
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
    <ModalContainer>
      <InnerModalContainer>
        <InnerContainer
          className={`
        ${modalOpen ? "open" : ""} 
        ${mobileMenuOpen ? "mobileMenuOpen" : ""}
      `}
          aria-hidden={modalOpen ? "false" : "true"}
          color="white"
        >
          <Text variant="subheading" color="error" align="center">
            Adding reviews isn't currently supported, but is coming soon!
          </Text>
        </InnerContainer>
      </InnerModalContainer>
    </ModalContainer>
  );
};

export default React.memo(AddReviewModal);
