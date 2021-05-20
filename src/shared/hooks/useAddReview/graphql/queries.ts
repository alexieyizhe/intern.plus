import { gql, DocumentNode } from "apollo-boost";

export const addReviewBuilder = (
  isNewCompany: boolean,
  isNewJob: boolean
): DocumentNode => {
  let companyQuery;
  let jobQuery;

  if (isNewCompany && isNewJob) {
    // both create
    companyQuery = `{ connect: { slug: $companySlug } }`;
    jobQuery = `{ create: { name: $jobName, slug: $jobSlug, location: $location, company: { create: { name: $companyName, slug: $companySlug } } } }`;
  } else if (isNewJob) {
    companyQuery = `{ connect: { slug: $companySlug } }`;
    jobQuery = `{ create: { name: $jobName, slug: $jobSlug, location: $location, company: { connect: { slug: $companySlug } } } }`;
  } else if (isNewJob) {
    throw new Error("Cannot connect existing job to new company");
  } else {
    // both company and job exist already
    companyQuery = `{ connect: { slug: $companySlug } }`;
    jobQuery = `{ connect: { id: $jobId } }`;
  }

  return gql`
    query AddReview {
    companies {
      count
    }
  }
  #   mutation AddReview(
  #     ${!isNewJob ? "$jobId: ID!" : ""}
  #     ${isNewJob ? "$jobName: String!" : ""}
  #     ${isNewJob ? "$jobSlug: String!" : ""}
  #     ${isNewCompany ? "$companyName: String!" : ""}
  #     $companySlug: String!
  #     ${isNewJob ? "$location: String!" : ""}
  #     $overallRating: Float!
  #     $learningMentorshipRating: Float
  #     $meaningfulWorkRating: Float
  #     $workLifeBalanceRating: Float
  #     $body: String!
  #     $tags: String
  #     $salary: Int!
  #     $salaryCurrency: String!
  #     $salaryPeriod: String!
  #     $authorEmail: String!
  #   ) {
  #     reviewCreate(
  #       data: {
  #         company: ${companyQuery}
  #         job: ${jobQuery}
  #         body: $body
  #         tags: $tags
  #         salary: $salary
  #         salaryCurrency: $salaryCurrency
  #         salaryPeriod: $salaryPeriod
  #         overallRating: $overallRating
  #         learningMentorshipRating: $learningMentorshipRating
  #         meaningfulWorkRating: $meaningfulWorkRating
  #         workLifeBalanceRating: $workLifeBalanceRating
  #         isSpam: false
  #         isLegacy: false
  #         isAnonymous: true
  #         isVerified: false
  #         authorEmail: $authorEmail
  #       }
  #     ) {
  #       id
  #     }
  #   }
  `;
};
