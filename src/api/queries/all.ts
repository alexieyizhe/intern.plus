import { gql } from "apollo-boost";

import { reviewResultJobFragment } from "./review";
import { jobResultFragment } from "./job";
import { companyResultFragment } from "./company";

export const GET_COMPANIES_REVIEWS_LANDING = gql`
  query GetCompaniesReviewsLanding {
    companiesList(sort: { avgRating: ASC }) {
      items {
        ...CompanyResult
      }
    }

    reviewsList(sort: { createdAt: ASC }) {
      items {
        ...ReviewResultJob
      }
    }
  }

  ${companyResultFragment}
  ${reviewResultJobFragment}
`;

// gets all results (company, job, review) matching query
export const GET_ALL_SEARCH = gql`
  query GetAllSearch($query: String) {
    companiesList(
      filter: { name: { contains: $query }, desc: { contains: $query } }
    ) {
      items {
        ...CompanyResult
      }
    }

    jobsList(
      filter: {
        name: { contains: $query }
        company: { name: { contains: $query } }
        location: { contains: $query }
      }
    ) {
      items {
        ...JobResult
      }
    }

    reviewsList(
      filter: {
        company: { name: { contains: $query } }
        job: { name: { contains: $query } }
        body: { contains: $query }
        tags: { contains: $query }
        author: { contains: $query }
      }
    ) {
      items {
        ...ReviewResultJob
      }
    }
  }

  ${companyResultFragment}
  ${jobResultFragment}
  ${reviewResultJobFragment}
`;
