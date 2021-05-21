import { IResolvers } from "apollo-server-micro";

import {
  companiesLandingQueryResolver,
  companiesQueryResolver,
  companyResolver,
} from "./company";
import { jobsResolver, jobResolver, jobsQueryResolver } from "./job";
import {
  reviewsResolver,
  reviewResolver,
  reviewsQueryResolver,
  reviewsLandingQueryResolver,
} from "./review";

const resolvers: IResolvers = {
  Query: {
    companies: companiesQueryResolver,
    company: companyResolver,

    jobs: jobsQueryResolver,
    job: jobResolver,

    reviews: reviewsQueryResolver,
    review: reviewResolver,

    companiesLanding: companiesLandingQueryResolver,
    reviewsLanding: reviewsLandingQueryResolver,
  },
  Company: {
    jobs: jobsResolver,
    reviews: reviewsResolver,
  },
  Job: {
    company: companyResolver,
    reviews: reviewsResolver,
  },
  Review: {
    company: companyResolver,
    job: jobResolver,
  },
  SalaryPeriod: {
    HOURLY: "hourly",
    WEEKLY: "weekly",
    MONTHLY: "monthly",
    YEARLY: "yearly",
  },
  Listable: {
    __resolveType(listable) {
      return listable.__typename ?? null;
    },
  },
};

export default resolvers;
