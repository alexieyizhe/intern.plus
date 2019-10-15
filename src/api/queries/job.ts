import { gql } from "apollo-boost";

import { reviewResultUserFragment } from "./review";
// everything you need to query for a job when searching
export const jobResultFragment = gql`
  fragment JobResult on Job {
    id
    name
    location
    avgRating
    reviews {
      count
    }
    minHourlySalary
    maxHourlySalary
    salaryCurrency
  }
`;

// used in positions/:positionId page
export const GET_JOB_DETAILS = gql`
  query GetJob($id: ID) {
    job(id: $id) {
      name
      location
      company {
        name
      }
      minHourlySalary
      maxHourlySalary
      salaryCurrency
      reviews {
        count
        items {
          ...ReviewResultUser
        }
      }
      avgRating
      avgLearningMentorshipRating
      avgMeaningfulWorkRating
      avgWorkLifeBalanceRating
    }
  }

  ${reviewResultUserFragment}
`;

// gets all jobs
export const GET_JOBS = gql`
  query GetJobs {
    jobsList {
      items {
        ...JobResult
      }
    }
  }

  ${jobResultFragment}
`;

export const GET_JOBS_SEARCH = gql`
  query GetJobsSearch($query: String) {
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
  }

  ${jobResultFragment}
`;
