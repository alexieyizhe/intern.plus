import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import { useSearchSuggestions } from "src/shared/hooks/useSearchSuggestions";
import { useWindowWidth } from "src/shared/hooks/useWindowWidth";
import { RouteName } from "src/shared/constants/routing";
import { SearchField, Text, Button } from "src/components";
import { SearchType } from "src/shared/constants/search";

import copy from "../copy";

/*******************************************************************
 *                             **Types**                           *
 *******************************************************************/
export interface ISplashScreenProps {
  onTriggerSearch: (value: string) => void;
}

/*******************************************************************
 *                            **Styles**                           *
 *******************************************************************/
const Container = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  padding: 0;

  display: flex;
  justify-content: space-between;

  ${({ theme }) => theme.mediaQueries.medium`
    height: auto;
    flex-direction: column-reverse;
    justify-content: flex-end;
  `}
`;

const LeftColumn = styled.div`
  width: 35%;
  padding: 50px 0;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  & h1 {
    margin-bottom: 10px;
  }

  & h3 {
    margin-bottom: 30px;
  }

  ${({ theme }) => theme.mediaQueries.medium`
    width: 100%;
    height: 45%;
    padding: 10px 0;

    align-items: center;
    
    & h3 {
      margin-bottom: 20px;
    }

    & h1, 
    & h3 {
      text-align: center;
    }
  `}

  ${({ theme }) => theme.mediaQueries.smallMobile`
    height: 50%;
  `}
`;

const RightColumn = styled.div`
  position: relative;
  width: 55%;

  display: flex;
  align-items: center;

  & > img {
    position: relative;
    max-width: 100%;
  }

  ${({ theme }) => theme.mediaQueries.medium`
    width: 100%;
    height: 55%;

    & > img {
      max-width: 110%;
      left: -5%;
    }
  `}
`;

/*******************************************************************
 *                           **Component**                         *
 *******************************************************************/
const SplashScreen: React.FC<ISplashScreenProps> = ({
  onTriggerSearch,
  ...rest
}) => {
  const history = useHistory();
  const searchSuggestions = useSearchSuggestions({
    searchType: SearchType.COMPANIES,
  });
  const { isMobile } = useWindowWidth(); // show only search button on mobile

  return (
    <Container {...rest}>
      <LeftColumn>
        <div>
          <Text variant="heading1" as="h1">
            {copy.splashCard.heading}
          </Text>
          <Text variant="heading3" color="textSecondary" as="h3">
            {copy.splashCard.subheading}
          </Text>
        </div>
        <div>
          {isMobile ? (
            <Button
              onClick={() => history.push(RouteName.SEARCH)}
              color="greenSecondary"
            >
              <Text variant="subheading" color="backgroundPrimary">
                {copy.splashCard.searchButtonText}
              </Text>
            </Button>
          ) : (
            <SearchField
              className="landing-search"
              inputProps={{ placeholder: "Search for a company" }}
              onTriggerSearch={onTriggerSearch}
              suggestions={searchSuggestions}
            />
          )}
        </div>
      </LeftColumn>

      <RightColumn>
        <img
          src={copy.splashCard.splashImg.src}
          alt={copy.splashCard.splashImg.alt}
        />
      </RightColumn>
    </Container>
  );
};

export default SplashScreen;
