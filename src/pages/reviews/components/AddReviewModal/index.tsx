import styled from "styled-components";
import React, { useRef, Suspense } from "react";
import classNames from "classnames";

import {
  HEADER_HEIGHT,
  MOBILE_MENU_HEIGHT,
  MOBILE_MENU_MEDIA_QUERY,
} from "src/components/PageHeader";
import { useMobileMenuContext, useAddReviewModalContext } from "src/contexts";
import { useOnClickOutside } from "src/shared/hooks/useOnClickOutside";
import { Card, Spinner } from "src/components";

const ModalContainer = styled.div`
  position: fixed;
  width: 650px;
  top: ${HEADER_HEIGHT + 15}px;
  right: ${({ theme }) => theme.padding.pageHorizontal}px;
  z-index: -1;

  &.open {
    z-index: ${({ theme }) => theme.zIndex.modal};
  }

  &.mobile-menu-open {
    top: ${HEADER_HEIGHT + MOBILE_MENU_HEIGHT + 10}px;
  }

  ${({ theme }) => theme.mediaQueries.medium`
  width: calc(100% - ${theme.padding.pageHorizontalMobile * 2}px);
`}

  ${({ theme }) => theme.mediaQueries[MOBILE_MENU_MEDIA_QUERY]`
  right: ${theme.padding.pageHorizontalMobile}px;
`}
`;

const InnerContainer = styled(Card)`
  position: relative;
  margin-left: auto;
  max-width: 100%;
  max-height: 85vh;
  padding: ${({ theme }) => theme.padding.displayMobile};

  display: flex;
  flex-direction: column;

  box-shadow: ${({ theme }) => theme.boxShadow.hover},
    0px 0px 0px 2px ${({ theme }) => theme.color.backgroundSecondary};
  overflow-y: scroll;

  transition: all 150ms ease-out;
  opacity: 0;
  transform: translateY(10px);
  &.open {
    opacity: 1;
    transform: translateY(0);
  }

  & > * {
    margin-top: 20px;
  }

  ${({ theme }) => theme.mediaQueries.tablet`
    padding: ${theme.padding.displayMobile};
    max-height: 70vh;
  `}

  ${({ theme }) => theme.mediaQueries.xlMobile`
    margin: auto;  
    right: unset;
  `}
`;

const LazyAddReviewContents = React.lazy(() =>
  import(/* webpackChunkName: "add-review-modal-contents" */ "./Contents")
);

const AddReviewModal = () => {
  const {
    isAddReviewModalOpen,
    setAddReviewModalOpen,
  } = useAddReviewModalContext();
  const { isMobileMenuOpen } = useMobileMenuContext();

  /**
   * Automatically close the review modal when clicking outside,
   * since it obstructs visibility.
   */
  const modalRef = useRef<HTMLDivElement | null>(null);
  useOnClickOutside(modalRef, () => setAddReviewModalOpen(false));

  return (
    <ModalContainer
      className={classNames({
        open: isAddReviewModalOpen,
        "mobile-menu-open": isMobileMenuOpen,
      })}
      ref={modalRef}
    >
      <InnerContainer
        id="add-review-modal"
        className={classNames({
          open: isAddReviewModalOpen,
        })}
        aria-hidden={isAddReviewModalOpen ? "false" : "true"}
        color="backgroundPrimary"
      >
        <Suspense fallback={<Spinner />}>
          <LazyAddReviewContents />
        </Suspense>
      </InnerContainer>
    </ModalContainer>
  );
};

export default AddReviewModal;
