import React from "react";
import styled from "styled-components";
import classNames from "classnames";

import Card from "src/components/Card";
import Spinner from "src/components/Spinner";
import Text from "src/components/Text";
import SelectField, { ISelectFieldProps } from "src/components/SelectField";
import { MOBILE_MENU_MEDIA_QUERY } from "src/components/PageHeader";
import { ICardProps } from "../RawCard";

/*******************************************************************
 *                            **Types**                           *
 *******************************************************************/
export interface IDetailsCardProps
  extends ICardProps,
    React.ComponentPropsWithoutRef<"div"> {
  loading: boolean;
  error: boolean;

  selectFieldProps?: ISelectFieldProps;
}

/*******************************************************************
 *                  **Utility functions/constants**                *
 *******************************************************************/
const ERROR_OCCURRED_TEXT = "An error occurred while getting details.";

const Container = styled(Card)`
  position: relative;
  width: 100%;
  padding: ${({ theme }) => theme.padding.display};

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  & .loading {
    margin: auto;
    align-self: center;
    padding: 50px 0;
  }

  & .error {
    margin: auto;
    align-self: center;
    padding: 50px 0;
  }

  & .search-field input {
    background-color: white;
  }

  ${({ theme }) => theme.mediaQueries[MOBILE_MENU_MEDIA_QUERY]`
    width: calc(100% + ${theme.padding.pageHorizontalMobile * 2}px);
    left: -${theme.padding.pageHorizontalMobile}px;
    padding: ${theme.padding.displayMobile};

    border-radius: 0;
  `}
`;

/*******************************************************************
 *                           **Component**                         *
 *******************************************************************/
const DetailsCard: React.FC<IDetailsCardProps> = ({
  className,
  loading,
  error,
  selectFieldProps,
  children,
  ...rest
}) => (
  <Container className={classNames("details-card", className)} {...rest}>
    {error ? (
      <Text
        variant="subheading"
        className="error"
        color="error"
        as="div"
        align="center"
      >
        {ERROR_OCCURRED_TEXT}
      </Text>
    ) : loading ? (
      <Spinner className="loading" />
    ) : (
      children
    )}

    {selectFieldProps && <SelectField {...selectFieldProps} />}
  </Container>
);

export default DetailsCard;
