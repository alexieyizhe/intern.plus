import React from "react";

import { Text } from "src/components";
import pageCopy from "../copy";

export interface IReviewJobResult {
  name: string; // company name
  id: string;
  role: string; // role/position
  rating: number; // score out of 5
  contents: string;
  color: string;
}

export interface IReviewUserResult {
  name: string; // name of the reviewer (or Anonymous)
  id: string;
  date: string; // date of the review
  rating: number;
  contents: string;
  color: string;
}

export interface ICompanyResult {
  name: string;
  slug: string; // unique slug for company
  desc: string;
  logoSrc: string;
  avgRating: number; // score out of 5
  numRatings: number;
  color: string;
}

export interface IJobResult {
  id: string;
  role: string;
  location: string;
  avgRating: number; // score out of 5
  numRatings: number;
  minHourlySalary: number; // hourly
  maxHourlySalary: number; // hourly
  salaryCurrency: string; // hourly
  color: string;
}

export type SearchResult =
  | IReviewJobResult
  | IReviewUserResult
  | ICompanyResult
  | IJobResult;

export const resultIsReviewJob = (
  result: SearchResult
): result is IReviewJobResult => "contents" in result && "role" in result;

export const resultIsReviewUser = (
  result: SearchResult
): result is IReviewUserResult => "contents" in result && "date" in result;

export const resultIsCompany = (
  result: SearchResult
): result is ICompanyResult => "slug" in result && "avgRating" in result;

export const resultIsJob = (result: SearchResult): result is IJobResult =>
  "location" in result && "salaryCurrency" in result;

export const getHeadingMarkup = (query: string, queryParams?: string[]) => {
  if (query) {
    if (!queryParams) {
      return (
        <>
          <Text variant="heading1" color="greyDark">
            {pageCopy.searchingHeadingPrefix}
          </Text>
          <Text variant="heading1">{query}</Text>
        </>
      );
    }
  }

  return <Text variant="heading1">{pageCopy.defaultHeading}</Text>;
};
