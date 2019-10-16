import { gql } from "apollo-boost";
import { jobResultFragment } from "src/api/fragments";

// TODO: add limits to fetching jobs (same for fetching reviews in GET_JOB)
export const GET_COMPANY_DETAILS = gql`
  query GetCompanyDetails($slug: String) {
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
