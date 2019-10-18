import React, { useMemo } from "react";
import styled, { css } from "styled-components";
import { Planet, KawaiiMood } from "react-kawaii";
import { default as AnimatedIcon } from "react-useanimations";
import { Waypoint } from "react-waypoint";

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
  noMoreResults: boolean;
  searchResults: IGenericCardItem[];
  onResultsEndReached?: () => void;
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
        <Text variant="subheading" as="div" color="greyDark">
          {START_SEARCH_TEXT}
        </Text>
      );
      break;

    case DisplayState.LOADING:
      mood = "excited";
      markup = <AnimatedIcon animationKey="loading" />;
      break;

    case DisplayState.ERROR:
      mood = "ko";
      markup = (
        <Text variant="subheading" color="error" as="div">
          {ERROR_OCCURRED_TEXT}
        </Text>
      );
      break;

    case DisplayState.NO_RESULTS:
      mood = "sad";
      markup = (
        <Text variant="subheading" as="div" color="greyDark">
          {NO_RESULTS_TEXT}
        </Text>
      );
      break;

    case DisplayState.NO_MORE_RESULTS:
      mood = "sad";
      markup = (
        <Text variant="subheading" as="div" color="greyDark">
          {NO_MORE_RESULTS_TEXT}
        </Text>
      );
      break;
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

  return; // should never happen
};

/*******************************************************************
 *                            **Styles**                           *
 *******************************************************************/
const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 30px 0;
`;

const MiscContent = styled.div<{ hide?: boolean }>`
  display: ${({ hide }) => (hide ? "none" : "flex")};
  align-items: center;
  text-align: center;

  margin: 20px auto 0 auto;
`;

const Results = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  & > * {
    margin: 10px auto;
  }
`;

const resultsCardStyles = css`
  width: 650px;
  height: 180px;

  ${({ theme }) => theme.mediaQueries.tablet`
    width: 100%;
    height: 210px;
  `}

  ${({ theme }) => theme.mediaQueries.largeMobile`
    height: 250px;
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

  ${({ theme }) => theme.mediaQueries.tablet`
    height: 180px;
  `}
`;

// TODO: should loading indicator be displayed whenever user stops typing to show waiting and not just
//       have a period of time where nothing happens before search activates?

/*******************************************************************
 *                           **Component**                         *
 *******************************************************************/
const ResultsDisplay: React.FC<IResultsDisplayProps> = ({
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
      <MiscContent hide={shouldShowResults}>
        <Planet size={200} mood={mood} color="#DDDDDD" />
      </MiscContent>

      <Results>{searchResults.map(getResultCardMarkup)}</Results>

      <MiscContent>{markup}</MiscContent>

      {searchResults.length > 0 && !noMoreResults && (
        <Waypoint onEnter={onResultsEndReached} />
      )}
    </Container>
  );
};

export default React.memo(ResultsDisplay);
