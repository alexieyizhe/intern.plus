import { gql } from "apollo-boost";

// everything you need to query for a review (with job info) when searching
export const reviewResultJobFragment = gql`
  fragment ReviewResultJob on Review {
    id
    overallRating
    body
    company {
      name
    }
    job {
      name
    }
  }
`;

// everything you need to query for a review (with user info) when searching
export const reviewResultUserFragment = gql`
  fragment ReviewResultUser on Review {
    id
    overallRating
    body
    author
    createdAt
    updatedAt
  }
`;

// used in reviews/:reviewId page
export const GET_REVIEW_DETAILS = gql`
  query GetReview($id: ID) {
    review(id: $id) {
      author
      body
      tags
      job {
        name
        location
      }
      company {
        name
      }
      salary
      salaryPeriod
      salaryCurrency
      overallRating
      learningMentorshipRating
      meaningfulWorkRating
      workLifeBalanceRating
    }
  }
`;

// gets all reviews
export const GET_REVIEWS_WITH_JOB_INFO = gql`
  query GetReviewsWithJobInfo {
    reviewsList {
      items {
        ...ReviewResultJob
      }
    }
  }

  ${reviewResultJobFragment}
`;

// gets all reviews
export const GET_REVIEWS_WITH_USER_INFO = gql`
  query GetReviewsWithUserInfo {
    reviewsList {
      items {
        ...ReviewResultUser
      }
    }
  }

  ${reviewResultUserFragment}
`;

export const GET_REVIEWS_SEARCH = gql`
  query GetReviewsSearch($query: String) {
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

  ${reviewResultJobFragment}
`;
