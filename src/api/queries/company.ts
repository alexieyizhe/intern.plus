import { gql } from "apollo-boost";

import { jobResultFragment } from "./job";
export const companyResultFragment = gql`
  fragment CompanyResult on Company {
    slug
    name
    desc
    avgRating
    reviews {
      count
    }
  }
`;

// used in companies/:companySlug page
// TODO: add limits to fetching jobs (same for fetching reviews in GET_JOB)
export const GET_COMPANY_DETAILS = gql`
  query GetCompanyPage($slug: String) {
    company(slug: $slug) {
      name
      desc
      jobs {
        items {
          ...JobResult
        }
      }
      reviews {
        count
      }
      avgRating
    }
  }

  ${jobResultFragment}
`;

// gets all companies
export const GET_COMPANIES = gql`
  query GetCompanies {
    companiesList {
      items {
        ...CompanyResult
      }
    }
  }

  ${companyResultFragment}
`;

export const GET_COMPANIES_SEARCH = gql`
  query GetCompaniesSearch($query: String) {
    companiesList(
      filter: { name: { contains: $query }, desc: { contains: $query } }
    ) {
      items {
        ...CompanyResult
      }
    }
  }

  ${companyResultFragment}
`;
