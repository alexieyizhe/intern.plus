import React from "react";
import styled from "styled-components";
import classNames from "classnames";

import { useSiteContext } from "src/context";

import {
  Card,
  Text,
  TextInput,
  TextArea,
  StarRating,
  Button,
  Tooltip,
} from "src/components";
import {
  HEADER_HEIGHT,
  MOBILE_MENU_HEIGHT,
  MOBILE_MENU_MEDIA_QUERY,
} from "src/components/PageHeader";

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

const Field = styled.div`
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
    display: flex;
    justify-content: space-between;

    & .salary-amt {
      width: 37%;
    }
    & .salary-currency {
      width: 25%;
    }
    & .salary-period {
      width: 32%;
    }
  }
`;

const SubmitButton = styled(Button)`
  margin: 20px auto;
  width: fit-content;
`;

const LabelTooltipCombo = styled.div`
  display: flex;
  align-items: center;

  & .tooltip {
    margin-left: 6px;
  }
`;

/*******************************************************************
 *                           **Component**                         *
 *******************************************************************/
const AddReviewModal: React.FC = () => {
  const {
    state: { addReviewModalOpen: modalOpen, mobileMenuOpen },
  } = useSiteContext();

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
          className={modalOpen ? "open" : ""}
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
              <TextInput placeholder="Name" color="greyLight" />
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
              <TextInput placeholder="Name" color="greyLight" />
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
              <TextInput placeholder="Name" color="greyLight" />
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
                />
                <TextInput
                  className="salary-currency"
                  placeholder="CAD"
                  type="number"
                  min={0}
                  color="greyLight"
                />
                <TextInput
                  className="salary-period"
                  placeholder="monthly"
                  type="number"
                  min={0}
                  color="greyLight"
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
              <StarRating maxStars={5} filledStars={3} color="#CFB316" />
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
              <StarRating maxStars={5} filledStars={3} />
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
              <StarRating maxStars={5} filledStars={3} />
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
              <StarRating maxStars={5} filledStars={3} />
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
              <TextArea placeholder="Share your thoughts" color="greyLight" />
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
                    Optional keywords related to your review (comma separated).
                  </Text>
                </Tooltip>
              </LabelTooltipCombo>
              <TextInput
                placeholder="e.g. hardware, startup, finance"
                color="greyLight"
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

              <TextInput color="greyLight" placeholder="billy@bob.com" />
            </VerticalField>
          </RowContainer>

          <SubmitButton color="greenDark">
            <Text variant="subheading" color="white">
              Submit
            </Text>
          </SubmitButton>
        </InnerContainer>
      </InnerModalContainer>
    </ModalContainer>
  );
};

export default React.memo(AddReviewModal);
