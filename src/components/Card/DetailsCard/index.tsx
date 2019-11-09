import React from "react";
import styled from "styled-components";
import classNames from "classnames";

import Card from "src/components/Card";
import Spinner from "src/components/Spinner";
import Text from "src/components/Text";
import SearchField, { ISearchFieldProps } from "src/components/SearchField";
import { MOBILE_MENU_MEDIA_QUERY } from "src/components/PageHeader";

/*******************************************************************
 *                            **Types**                           *
 *******************************************************************/
export interface IDetailsCardProps
  extends React.ComponentPropsWithoutRef<"div"> {
  loading: boolean;
  error: boolean;

  searchFieldProps?: ISearchFieldProps;
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

  background-color: ${({ theme, color }) => theme.color[color || "greyLight"]};

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

const ContentContainer = styled.div`
  position: relative;
  width: 100%;
`;

/*******************************************************************
 *                           **Component**                         *
 *******************************************************************/
const DetailsCard: React.FC<IDetailsCardProps> = ({
  className,
  loading,
  error,
  searchFieldProps,
  children,
  ...rest
}) => (
  <Container className={classNames("details-card", className)} {...rest}>
    <ContentContainer>
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
    </ContentContainer>

    {searchFieldProps && <SearchField {...searchFieldProps} />}
  </Container>
);

export default DetailsCard;
