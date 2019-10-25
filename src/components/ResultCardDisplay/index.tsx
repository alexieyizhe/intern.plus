import React, { useMemo } from "react";
import styled, { css } from "styled-components";
import { Planet, KawaiiMood } from "react-kawaii";
import { Waypoint } from "react-waypoint";

import { RouteName } from "src/utils/constants";
import {
  IGenericCardItem,
  isCompanyCardItem,
  isJobCardItem,
  isReviewJobCardItem,
  isReviewUserCardItem,
} from "src/types";

import Text from "src/components/Text";
import { ReviewCard, CompanyCard, JobCard } from "src/components/Card";
import Spinner from "src/components/Spinner";

/*******************************************************************
 *                             **Types**                           *
 *******************************************************************/
export interface IResultCardDisplayProps
  extends React.ComponentPropsWithoutRef<"section"> {
  searched: boolean; // has already searched once or more times
  loading: boolean;
  error: boolean;
  noMoreResults: boolean;
  searchResults: IGenericCardItem[];
  onResultsEndReached: () => void;
}

export enum DisplayState {
  INITIAL,
  LOADING,
  ERROR,
  RESULTS,
  NO_RESULTS,
  NO_MORE_RESULTS,
}

/*******************************************************************
 *                  **Utility functions/constants**                *
 *******************************************************************/
const NO_RESULTS_TEXT = "No results were found.";
const NO_MORE_RESULTS_TEXT = "All results have been shown.";
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
  state: DisplayState
): {
  mood: KawaiiMood;
  markup: JSX.Element;
} => {
  let mood: KawaiiMood = "shocked";
  let markup = <></>;

  switch (state) {
    case DisplayState.INITIAL:
      mood = "blissful";
      markup = (
        <Text variant="subheading" as="div" align="center" color="greyDark">
          {START_SEARCH_TEXT}
        </Text>
      );
      break;

    case DisplayState.LOADING:
      mood = "excited";
      markup = <Spinner />;
      break;

    case DisplayState.ERROR:
      mood = "ko";
      markup = (
        <Text variant="subheading" as="div" align="center" color="error">
          {ERROR_OCCURRED_TEXT}
        </Text>
      );
      break;

    case DisplayState.NO_RESULTS:
      mood = "sad";
      markup = (
        <Text variant="subheading" as="div" align="center" color="greyDark">
          {NO_RESULTS_TEXT}
        </Text>
      );
      break;

    case DisplayState.NO_MORE_RESULTS:
      mood = "sad";
      markup = (
        <Text variant="subheading" as="div" align="center" color="greyDark">
          {NO_MORE_RESULTS_TEXT}
        </Text>
      );
      break;
  }

  return { mood, markup };
};

/**
 * Gets the unique routes for each type of card for navigating to details of that card
 */
const getCompanyCardRoute = (companySlug: string) =>
  `${RouteName.COMPANIES}/${companySlug}`;

const getJobCardRoute = (jobId: string, jobSlug: string, companySlug: string) =>
  `${RouteName.JOBS}/${jobId}`;

const getReviewCardRoute = (reviewId: string) =>
  `${RouteName.REVIEWS}/${reviewId}`;

/**
 * Creates the markup for a single search result card, based on
 * the data in the search result.
 * @param result object containing item data for a specific search result
 */
const getResultCardMarkup = (result: IGenericCardItem) => {
  if (isCompanyCardItem(result)) {
    return (
      <ResultCompanyCard
        key={result.slug}
        name={result.name}
        logoSrc={result.logoSrc}
        desc={result.desc}
        numRatings={result.numRatings}
        avgRating={result.avgRating}
        color={result.color}
        linkTo={getCompanyCardRoute(result.slug)}
      />
    );
  } else if (isJobCardItem(result)) {
    return (
      <ResultJobCard
        key={result.id}
        title={result.name}
        subtitle={result.location}
        numRatings={result.numRatings}
        avgRating={result.avgRating}
        minHourlySalary={result.minHourlySalary}
        maxHourlySalary={result.maxHourlySalary}
        hourlySalaryCurrency={result.hourlySalaryCurrency}
        color={result.color}
        linkTo={getJobCardRoute(result.id, result.slug, result.companySlug)}
      />
    );
  } else if (isReviewJobCardItem(result) || isReviewUserCardItem(result)) {
    const heading = isReviewJobCardItem(result)
      ? result.companyName
      : result.authorName;
    const subheading = isReviewJobCardItem(result)
      ? result.jobName
      : result.date;

    return (
      <ResultReviewCard
        key={result.id}
        heading={heading}
        subheading={subheading}
        rating={result.overallRating}
        color={result.color}
        linkTo={getReviewCardRoute(result.id)}
      >
        <Text variant="body">{result.body}</Text>
      </ResultReviewCard>
    );
  }

  return; // should never happen
};

/*******************************************************************
 *                            **Styles**                           *
 *******************************************************************/
const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 30px 60px;

  & > * {
    margin: 10px auto;
  }

  ${({ theme }) => theme.mediaQueries.tablet`
    padding: 20px 0;
  `}
`;

const resultCardStyles = css`
  width: 100%;
  height: 180px;

  ${({ theme }) => theme.mediaQueries.tablet`
    width: 100%;
    height: 210px;
  `}

  ${({ theme }) => theme.mediaQueries.largeMobile`
    height: 250px;
  `}
`;

const ResultCompanyCard = styled(CompanyCard)`
  ${resultCardStyles}
`;
const ResultReviewCard = styled(ReviewCard)`
  ${resultCardStyles}
`;
const ResultJobCard = styled(JobCard)`
  ${resultCardStyles}

  ${({ theme }) => theme.mediaQueries.tablet`
    height: 180px;
  `}
`;

/*******************************************************************
 *                           **Component**                         *
 *******************************************************************/
const ResultCardDisplay: React.FC<IResultCardDisplayProps> = ({
  searched,
  loading,
  error,
  noMoreResults,
  searchResults,
  onResultsEndReached,
  ...rest
}) => {
  const curState = useMemo(() => {
    if (error) return DisplayState.ERROR;
    if (loading) return DisplayState.LOADING;
    if (searchResults.length === 0 && searched) return DisplayState.NO_RESULTS;
    if (noMoreResults) return DisplayState.NO_MORE_RESULTS;
    if (searchResults.length > 0) return DisplayState.RESULTS;

    return DisplayState.INITIAL;
  }, [error, loading, noMoreResults, searchResults.length, searched]);

  const { mood, markup } = useMemo(() => getMiscContent(curState), [curState]);

  const shouldShowResults = useMemo(
    () =>
      searchResults.length > 0 ||
      curState === DisplayState.RESULTS ||
      curState === DisplayState.NO_MORE_RESULTS,
    [curState, searchResults.length]
  );

  return (
    <Container {...rest}>
      <div hidden={shouldShowResults}>
        <Planet size={200} mood={mood} color="#DDDDDD" />
      </div>

      {searchResults.map(getResultCardMarkup)}

      {markup}

      {searchResults.length > 0 && !noMoreResults && (
        <Waypoint onEnter={onResultsEndReached} />
      )}
    </Container>
  );
};

export default React.memo(ResultCardDisplay);
