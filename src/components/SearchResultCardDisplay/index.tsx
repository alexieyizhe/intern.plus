import React, { useMemo } from "react";
import styled, { css } from "styled-components";
import { Planet, KawaiiMood } from "react-kawaii";
import { Waypoint } from "react-waypoint";

import { RouteName } from "src/shared/constants/routing";
import { SearchState } from "src/shared/hooks/useSearch";
import {
  IGenericCardItem,
  isCompanyCardItem,
  isJobCardItem,
  isReviewJobCardItem,
  isReviewUserCardItem,
} from "src/shared/constants/card";

import Text from "src/components/Text";
import { ReviewCard, CompanyCard, JobCard } from "src/components/Card";
import Spinner from "src/components/Spinner";

/*******************************************************************
 *                             **Types**                           *
 *******************************************************************/
export interface ISearchResultCardDisplayProps
  extends React.ComponentPropsWithoutRef<"section"> {
  searchState: SearchState;
  searchResults: IGenericCardItem[];
  onResultsEndReached: () => void;
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
  state: SearchState
): {
  mood: KawaiiMood;
  markup: JSX.Element;
} => {
  let mood: KawaiiMood = "shocked";
  let markup = <></>;

  if (state === SearchState.INITIAL) {
    mood = "blissful";
    markup = (
      <Text variant="subheading" as="div" align="center" color="greyDark">
        {START_SEARCH_TEXT}
      </Text>
    );
  } else if (
    state === SearchState.LOADING ||
    state === SearchState.RESULTS_LOADING
  ) {
    mood = "excited";
    markup = <Spinner />;
  } else if (state === SearchState.ERROR) {
    mood = "ko";
    markup = (
      <Text variant="subheading" as="div" align="center" color="error">
        {ERROR_OCCURRED_TEXT}
      </Text>
    );
  } else if (state === SearchState.NO_RESULTS) {
    mood = "sad";
    markup = (
      <Text variant="subheading" as="div" align="center" color="greyDark">
        {NO_RESULTS_TEXT}
      </Text>
    );
  } else if (state === SearchState.NO_MORE_RESULTS) {
    mood = "sad";
    markup = (
      <Text variant="subheading" as="div" align="center" color="greyDark">
        {NO_MORE_RESULTS_TEXT}
      </Text>
    );
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
    const subheading = result.companyName
      ? `${result.companyName}  •  ${result.location}`
      : result.location;

    return (
      <ResultJobCard
        key={result.id}
        heading={result.name}
        subheading={subheading}
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
      : result.author;
    const subheading = isReviewJobCardItem(result)
      ? `${result.jobName}  •  ${result.jobLocation}`
      : result.relativeDate;

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

  padding: ${({ theme }) => theme.padding.display};
  padding-top: 30px;

  & > * {
    margin: 10px auto;
  }

  ${({ theme }) => theme.mediaQueries.tablet`
    padding: 20px 0;
  `}
`;

const MarkupContainer = styled.div`
  width: 70%;
  margin: 5px auto;

  display: flex;
  & > * {
    margin: auto;
  }
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
const SearchResultCardDisplay: React.FC<ISearchResultCardDisplayProps> = ({
  searchState,
  searchResults,
  onResultsEndReached,
  ...rest
}) => {
  const { mood, markup } = useMemo(() => getMiscContent(searchState), [
    searchState,
  ]);

  const shouldShowResults = useMemo(
    () =>
      searchResults.length > 0 ||
      searchState === SearchState.RESULTS ||
      searchState === SearchState.RESULTS_LOADING ||
      searchState === SearchState.NO_MORE_RESULTS,
    [searchResults.length, searchState]
  );

  return (
    <Container {...rest}>
      <div hidden={shouldShowResults}>
        <Planet size={200} mood={mood} color="#DDDDDD" />
      </div>

      {searchResults.map(getResultCardMarkup)}

      <MarkupContainer>{markup}</MarkupContainer>

      {searchResults.length > 0 &&
        [SearchState.INITIAL, SearchState.RESULTS].includes(searchState) && (
          <Waypoint
            onEnter={() => {
              console.log("trigger waypoint");
              onResultsEndReached();
            }}
          />
        )}
    </Container>
  );
};

export default React.memo(SearchResultCardDisplay);
