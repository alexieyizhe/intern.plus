import React from "react";
import styled from "styled-components";

import { RouteName } from "src/utils/routes";
import {
  SearchResult,
  resultIsCompany,
  // resultIsJob,
  resultIsReviewJob,
  resultIsReviewUser,
} from "../utils";

import { ReviewCard, CompanyCard, JobCard } from "src/components";

export interface IResultsDisplayProps
  extends React.ComponentPropsWithoutRef<"section"> {
  searchResults: SearchResult[];
}

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const buildResultCard = (result: SearchResult) => {
  if (resultIsCompany(result)) {
    return (
      <CompanyCard
        name={result.name}
        logoSrc={result.logoSrc}
        desc={result.desc}
        numRatings={result.numRatings}
        avgRating={result.avgRating}
        linkTo={`${RouteName.COMPANIES}/${result.slug}`}
        color={result.color}
      />
    );
  } else if (resultIsReviewJob(result)) {
    return (
      <ReviewCard
        heading={result.name}
        subheading={result.role}
        rating={result.rating}
        linkTo={`${RouteName.REVIEWS}/${result.id}`}
      />
    );
  } else if (resultIsReviewUser(result)) {
    return (
      <ReviewCard
        heading={result.name}
        subheading={result.date}
        rating={result.rating}
        linkTo={`${RouteName.REVIEWS}/${result.id}`}
      />
    );
  }

  // result is job
  return (
    <JobCard
      title={result.role}
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
};

const ResultsDisplay: React.FC<IResultsDisplayProps> = ({
  searchResults,
  ...rest
}) => <Container {...rest}>{searchResults.map(buildResultCard)}</Container>;

export default ResultsDisplay;
