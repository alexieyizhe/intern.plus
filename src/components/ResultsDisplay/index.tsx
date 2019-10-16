import React, { useState, useEffect, useMemo } from "react";
import styled, { css } from "styled-components";
import { Planet, KawaiiMood } from "react-kawaii";
import { default as AnimatedIcon } from "react-useanimations";

import { RouteName } from "src/utils/routes";
import {
  IGenericCardItem,
  isCompanyCardItem,
  isJobCardItem,
  isReviewJobCardItem,
  isReviewUserCardItem,
} from "src/types";

import Text from "src/components/Text";
import { ReviewCard, CompanyCard, JobCard } from "src/components/Card";

/*******************************************************************
 *                             **Types**                           *
 *******************************************************************/
export interface IResultsDisplayProps
  extends React.ComponentPropsWithoutRef<"section"> {
  searched: boolean; // has already searched once or more times
  loading: boolean;
  error: boolean;
  searchResults: IGenericCardItem[];
}

/*******************************************************************
 *                  **Utility functions/constants**                *
 *******************************************************************/
const NO_RESULTS_TEXT = "No results were found.";
const ERROR_OCCURRED_TEXT = "An error occurred while searching.";
const START_SEARCH_TEXT =
  "There's nothing here. Type something to get started!";
/**
 * Determines the mood of the planet illustration
 * that should be displayed in situations when normal
 * search results aren't available.
 * @param searched `true` if the first search has already been executed
 * @param loading `true` if the search query is currently being executed
 * @param error `true` the search query resulted in an error
 * @param noResults `true` if the search query returned no results
 */
const getMiscContent = (
  searched: boolean,
  loading: boolean,
  error: boolean,
  noResults: boolean
): {
  mood: KawaiiMood;
  markup: JSX.Element;
} => {
  let mood: KawaiiMood = "blissful";
  let markup = <></>;
  if (!searched) {
    mood = "blissful";
    markup = (
      <Text variant="subheading" as="div">
        {START_SEARCH_TEXT}
      </Text>
    );
  } else if (loading) {
    mood = "excited";
    markup = <AnimatedIcon animationKey="loading" />;
  } else if (error) {
    mood = "ko";
    markup = (
      <Text variant="subheading" color="error" as="div">
        {ERROR_OCCURRED_TEXT}
      </Text>
    );
  } else if (noResults) {
    mood = "sad";
    markup = (
      <Text variant="subheading" as="div">
        {NO_RESULTS_TEXT}
      </Text>
    );
  }

  return { mood, markup };
};

/**
 * Creates the markup for a single search result card, based on
 * the data in the search result.
 * @param result object containing item data for a specific search result
 */
const getResultCardMarkup = (result: IGenericCardItem) => {
  if (isCompanyCardItem(result)) {
    return (
      <ResultsCompanyCard
        key={result.slug}
        name={result.name}
        logoSrc={result.logoSrc}
        desc={result.desc}
        numRatings={result.numRatings}
        avgRating={result.avgRating}
        color={result.color}
        linkTo={`${RouteName.COMPANIES}/${result.slug}`}
      />
    );
  } else if (isJobCardItem(result)) {
    return (
      <ResultsJobCard
        key={result.id}
        title={result.name}
        subtitle={result.location}
        numRatings={result.numRatings}
        avgRating={result.avgRating}
        minHourlySalary={result.minHourlySalary}
        maxHourlySalary={result.maxHourlySalary}
        salaryCurrency={result.salaryCurrency}
        color={result.color}
        linkTo={`${RouteName.JOBS}/${result.id}`}
      />
    );
  } else if (isReviewJobCardItem(result)) {
    return (
      <ResultsReviewCard
        key={result.id}
        heading={result.companyName}
        subheading={result.jobName}
        rating={result.rating}
        color={result.color}
        linkTo={`${RouteName.REVIEWS}/${result.id}`}
      >
        <Text variant="body">{result.body}</Text>
      </ResultsReviewCard>
    );
  } else if (isReviewUserCardItem(result)) {
    return (
      <ResultsReviewCard
        key={result.id}
        heading={result.authorName}
        subheading={result.date}
        rating={result.overallRating}
        color={result.color}
        linkTo={`${RouteName.REVIEWS}/${result.id}`}
      >
        <Text variant="body">{result.body}</Text>
      </ResultsReviewCard>
    );
  }

  return undefined; // should never happen
};

/*******************************************************************
 *                            **Styles**                           *
 *******************************************************************/
const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  & > * {
    margin: 10px auto;
  }
`;

const MiscContentContainer = styled.div<{ show?: boolean }>`
  display: ${({ show }) => (show ? "flex" : "none")};
  flex-direction: column;
  align-items: center;
  text-align: center;

  height: 400px;
  width: 200px;
  padding: 50px 0;

  & > *:nth-child(2) {
    margin-top: 15px;
  }
`;

const resultsCardStyles = css`
  width: 650px;
  height: 180px;

  ${({ theme }) => theme.mediaQueries.tablet`
    width: 100%;
  `}
`;
const ResultsCompanyCard = styled(CompanyCard)`
  ${resultsCardStyles}
`;
const ResultsReviewCard = styled(ReviewCard)`
  ${resultsCardStyles}
`;
const ResultsJobCard = styled(JobCard)`
  ${resultsCardStyles}
`;

/*******************************************************************
 *                           **Component**                         *
 *******************************************************************/
const ResultsDisplay: React.FC<IResultsDisplayProps> = ({
  searched,
  loading,
  error,
  searchResults,
  ...rest
}) => {
  const showMisc = useMemo(
    () => !searched || loading || error || !searchResults.length,
    [error, loading, searchResults.length, searched]
  );
  // TODO: should loading indicator be displayed whenever user stops typing to show waiting and not just
  //       have a period of time where nothing happens before search activates?

  const [planetMood, setPlanetMood] = useState<KawaiiMood>("blissful");
  const [miscMarkup, setMiscMarkup] = useState(<></>);

  useEffect(() => {
    const { mood, markup } = getMiscContent(
      searched,
      loading,
      error,
      !searchResults.length
    );
    setPlanetMood(mood);
    setMiscMarkup(markup);
  }, [error, loading, searchResults.length, searched]);

  return (
    <Container {...rest}>
      <MiscContentContainer show={showMisc}>
        <Planet size={200} mood={planetMood} color="#DDDDDD" />
        {miscMarkup}
      </MiscContentContainer>

      {!showMisc && searchResults.map(getResultCardMarkup)}
    </Container>
  );
};

export default ResultsDisplay;
