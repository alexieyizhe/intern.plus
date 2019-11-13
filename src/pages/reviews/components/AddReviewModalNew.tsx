import React, { useState, useCallback } from "react";
import styled from "styled-components";
import classNames from "classnames";

import { useSiteContext } from "src/context";

import {
  Card,
  Text,
  TextInput,
  TextArea,
  Select,
  StarRating,
  Button,
  Tooltip,
  UnstyledButton,
  Spinner,
  baseLinkStyles,
} from "src/components";
import {
  HEADER_HEIGHT,
  MOBILE_MENU_HEIGHT,
  MOBILE_MENU_MEDIA_QUERY,
} from "src/components/PageHeader";

export interface IAddReviewModalProps
  extends React.ComponentPropsWithoutRef<"div"> {}

/*******************************************************************
 *                            **Styles**                           *
 *******************************************************************/
const ModalContainer = styled.div`
  position: fixed;
  width: 100%;
  top: ${HEADER_HEIGHT + 5}px;

  z-index: -1;

  &.open {
    z-index: ${({ theme }) => theme.zIndex.modal};
  }

  &.mobile-menu-open {
    top: ${HEADER_HEIGHT + MOBILE_MENU_HEIGHT + 10}px;
  }
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
  max-width: 650px;
  max-height: 85vh;
  padding: ${({ theme }) => theme.padding.displayMobile};

  display: flex;
  flex-direction: column;

  box-shadow: ${({ theme }) => theme.boxShadow.hover};
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

  &.isConfirmingSubmit article {
    opacity: 0.6;
  }

  ${({ theme }) => theme.mediaQueries.medium`
    max-width: 100%;
  `}

  ${({ theme }) => theme.mediaQueries.tablet`
    padding: ${theme.padding.displayMobile};
  `}

  ${({ theme }) => theme.mediaQueries.xlMobile`
    margin: auto;  
    right: unset;
  `}
`;

const RowContainer = styled.div`
  margin: 10px 0;

  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;

const Field = styled.article`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  margin: 5px 0;

  width: 100%;

  &.half-width {
    width: 47%;
  }

  ${({ theme }) => theme.mediaQueries.xlMobile`
    width: 100% !important;
  `}
`;

const VerticalField = styled(Field)`
  flex-direction: column;

  & .label {
    margin-bottom: 6px;
  }
`;

const HorizontalField = styled(Field)`
  align-items: center;

  & .label {
    margin-right: 8px;
  }
`;

const LocationField = styled(VerticalField)`
  width: 30%;
`;

const SalaryField = styled(VerticalField)`
  position: relative;
  width: 64%;

  & > div {
    width: 100%;
    display: flex;
    justify-content: space-between;

    & .salary-amt {
      width: 36%;
    }
    & .salary-currency {
      width: 26%;
    }
    & .salary-period {
      width: 33%;
    }
  }
`;

const LabelTooltipCombo = styled.div`
  display: flex;
  align-items: center;

  & .tooltip {
    margin-left: 6px;
  }
`;

const ActionContainer = styled.div`
  margin: 25px auto 10px auto;

  display: flex;
  flex-direction: column;
  align-items: center;

  &.confirming-submit .cancel-submit-button {
    visibility: visible;
  }

  & .cancel-submit-button {
    margin-top: 5px;
    visibility: hidden;
    ${baseLinkStyles}
  }
`;

const ActionButton = styled(Button)`
  min-width: 100px;
  transition: all 150ms ease;

  display: flex;
  justify-content: center;
`;

/*******************************************************************
 *                           **Component**                         *
 *******************************************************************/
const AddReviewModal: React.FC<IAddReviewModalProps> = () => {
  const {
    state: { addReviewModalOpen: modalOpen, mobileMenuOpen },
  } = useSiteContext();

  const [isConfirmingSubmit, setIsConfirmingSubmit] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onPotentialSubmit = () => setIsConfirmingSubmit(true);

  const onSubmit = useCallback(() => {
    setIsSubmitting(true);
    setTimeout(() => {
      alert("submitted");
      setIsSubmitting(false);
      setIsConfirmingSubmit(false);
    }, 2000);
  }, []);

  return (
    <ModalContainer
      className={classNames({
        open: modalOpen,
        "mobile-menu-open": mobileMenuOpen,
      })}
    >
      <InnerModalContainer>
        <InnerContainer
          id="add-review-modal"
          className={classNames({ open: modalOpen, isConfirmingSubmit })}
          aria-hidden={modalOpen ? "false" : "true"}
          color="white"
        >
          <Text variant="heading2">Write a review</Text>
          <RowContainer>
            <VerticalField className="half-width">
              <Text
                variant="subheading"
                className="label"
                as="h4"
                color="greyDark"
              >
                Company name
              </Text>
              <Select
                placeholder="Name"
                color="greyLight"
                disabled={isConfirmingSubmit}
                creatable
              />
            </VerticalField>
            <VerticalField className="half-width">
              <Text
                variant="subheading"
                className="label"
                as="h4"
                color="greyDark"
              >
                Position title
              </Text>
              <Select
                placeholder="Title"
                color="greyLight"
                disabled={isConfirmingSubmit}
                creatable
              />
            </VerticalField>
          </RowContainer>
          <RowContainer>
            <LocationField>
              <Text
                variant="subheading"
                className="label"
                as="h4"
                color="greyDark"
              >
                Location
              </Text>
              <Select
                placeholder="city"
                color="greyLight"
                disabled={isConfirmingSubmit}
                creatable
              />
            </LocationField>
            <SalaryField>
              <Text
                variant="subheading"
                className="label"
                as="h4"
                color="greyDark"
              >
                Salary
              </Text>
              <div>
                <TextInput
                  className="salary-amt"
                  placeholder="Amount"
                  type="number"
                  min={0}
                  color="greyLight"
                  disabled={isConfirmingSubmit}
                />
                <Select
                  className="salary-currency"
                  placeholder="CAD"
                  color="greyLight"
                  creatable
                  disabled={isConfirmingSubmit}
                />
                <Select
                  className="salary-period"
                  placeholder="monthly"
                  color="greyLight"
                  disabled={isConfirmingSubmit}
                />
              </div>
            </SalaryField>
          </RowContainer>

          <RowContainer>
            <HorizontalField className="half-width">
              <Text
                variant="subheading"
                className="label"
                as="h4"
                color="greyDark"
              >
                Overall rating
              </Text>
              <StarRating
                maxStars={5}
                filledStars={3}
                color="#CFB316"
                disabled={isConfirmingSubmit}
              />
            </HorizontalField>
            <HorizontalField className="half-width">
              <Text
                variant="subheading"
                className="label"
                as="h4"
                color="greyDark"
              >
                Work-life balance
              </Text>
              <StarRating
                maxStars={5}
                filledStars={3}
                disabled={isConfirmingSubmit}
              />
            </HorizontalField>

            <HorizontalField className="half-width">
              <Text
                variant="subheading"
                className="label"
                as="h4"
                color="greyDark"
              >
                Mentorship &amp; learning
              </Text>
              <StarRating
                maxStars={5}
                filledStars={3}
                disabled={isConfirmingSubmit}
              />
            </HorizontalField>
            <HorizontalField className="half-width">
              <Text
                variant="subheading"
                className="label"
                as="h4"
                color="greyDark"
              >
                Meaningful work
              </Text>
              <StarRating
                maxStars={5}
                filledStars={3}
                disabled={isConfirmingSubmit}
              />
            </HorizontalField>
          </RowContainer>

          <RowContainer>
            <VerticalField>
              <Text
                variant="subheading"
                className="label"
                as="h4"
                color="greyDark"
              >
                Review
              </Text>
              <TextArea
                placeholder="Share your thoughts"
                color="greyLight"
                disabled={isConfirmingSubmit}
              />
            </VerticalField>
          </RowContainer>

          <RowContainer>
            <VerticalField>
              <LabelTooltipCombo className="label">
                <Text variant="subheading" as="h4" color="greyDark">
                  Tags
                </Text>
                <Tooltip position="right" color="greyMedium">
                  <Text variant="body" as="div">
                    Optional keywords related to your review.
                  </Text>
                </Tooltip>
              </LabelTooltipCombo>
              <Select
                placeholder="e.g. hardware, startup, finance"
                color="greyLight"
                disabled={isConfirmingSubmit}
                creatable
                isMulti
              />
            </VerticalField>
          </RowContainer>

          <RowContainer>
            <VerticalField>
              <LabelTooltipCombo className="label">
                <Text variant="subheading" as="h4" color="greyDark">
                  Email
                </Text>
                <Tooltip position="right" color="greyMedium">
                  <Text variant="body" as="div">
                    Your email will only be used for spam prevention.
                  </Text>
                  <br />
                  <Text variant="body" as="div" italic>
                    For a limited time, you'll also be entered into a draw to
                    win one of 5 $20 gift cards!
                  </Text>
                </Tooltip>
              </LabelTooltipCombo>

              <TextInput
                color="greyLight"
                placeholder="billy@bob.com"
                disabled={isConfirmingSubmit}
              />
            </VerticalField>
          </RowContainer>

          <ActionContainer
            className={isConfirmingSubmit ? "confirming-submit" : ""}
          >
            <ActionButton
              color={isConfirmingSubmit ? "greenDark" : "black"}
              disabled={isSubmitting}
              onClick={isConfirmingSubmit ? onSubmit : onPotentialSubmit}
            >
              {isSubmitting ? (
                <Spinner color="white" size={16} />
              ) : (
                <Text variant="subheading" color="white">
                  {isConfirmingSubmit ? "Confirm" : "Submit"}
                </Text>
              )}
            </ActionButton>

            <UnstyledButton
              className="cancel-submit-button"
              onClick={() => setIsConfirmingSubmit(false)}
              aria-hidden={isConfirmingSubmit ? "false" : "true"}
            >
              <Text variant="subheading" color="greyDark">
                cancel
              </Text>
            </UnstyledButton>
          </ActionContainer>
        </InnerContainer>
      </InnerModalContainer>
    </ModalContainer>
  );
};

export default React.memo(AddReviewModal);
