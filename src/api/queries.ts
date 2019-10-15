import { gql } from "apollo-boost";

export const GET_COMPANIES_LANDING = gql`
  query GetCompanies {
    sTAGINGCompaniesList {
      items {
        name
        desc
        slug
        reviews {
          count
        }
        avgReviewScore
      }
    }
  }
`;

export const GET_COMPANIES_SEARCH = gql`
  query GetCompaniesSearch($query: String) {
    sTAGINGCompaniesList(filter: { name: { contains: $query } }) {
      items {
        name
        desc
        slug
        reviews {
          count
        }
        avgReviewScore
      }
    }
  }
`;

// used in companies/:companySlug page
// TODO: add limits to fetching jobs (same for fetching reviews in GET_JOB)
export const GET_COMPANY = gql`
  query GetCompany($slug: String) {
    sTAGINGCompany(slug: $slug) {
      name
      desc
      reviews {
        count
      }
      avgReviewScore
      jobs {
        items {
          id
          title
          location
          minSalary
          maxSalary
          salaryCurrency
          reviews {
            count
          }
          avgReviewScore
        }
      }
    }
  }
`;

// used in positions/:positionId page
export const GET_JOB = gql`
  query GetJob($id: ID) {
    sTAGINGJob(id: $id) {
      title
      company {
        name
      }
      location
      minSalary
      maxSalary
      salaryCurrency
      reviews {
        count
        items {
          id
          author
          createdAt
          updatedAt
          body
          overallScore
        }
      }
      avgReviewScore
      avgWorkLifeBalanceScore
      avgMeaningfulWorkScore
      avgLearningMentorshipScore
    }
  }
`;

export const GET_REVIEWS_LANDING = gql`
  query GetReviews {
    sTAGINGReviewsList(first: 5) {
      items {
        id
        company {
          name
        }
        job {
          title
        }
        body
        overallScore
      }
    }
  }
`;
