/* eslint-disable @typescript-eslint/camelcase*/
require("cross-fetch/polyfill");
const ApolloClient = require("apollo-boost").default; // eslint-disable-line
const { gql } = require("apollo-boost"); // eslint-disable-line
const chalk = require("chalk"); // eslint-disable-line
const dotenv = require("dotenv"); // eslint-disable-line
dotenv.config();

const COMPANY_KEY = "company";
const JOB_KEY = "job";
const REVIEW_KEY = "user_review";

const companyJsonFile = require(`../data/${COMPANY_KEY}.json`); // eslint-disable-line
const jobJsonFile = require(`../data/${JOB_KEY}.json`); // eslint-disable-line
const reviewJsonFile = require(`../data/${REVIEW_KEY}.json`); // eslint-disable-line
const API_URL = process.env.REACT_APP_DB_GRAPHQL_API_URL;

const client = new ApolloClient({
  uri: API_URL,
  request: operation => {
    const token = process.env.SERVER_API_TOKEN;
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
    });
  },
});

const salaryReducer = (acc, cur, curIdx) => {
  const newAcc = acc;

  let curHourlySalary;
  if (cur.pay_period === "hourly") {
    curHourlySalary = Math.round(cur.salary_in_cents / 100);
  } else if (cur.pay_period === "weekly") {
    curHourlySalary = Math.round(cur.salary_in_cents / 100 / 40);
  } else if (cur.pay_period === "monthly") {
    curHourlySalary = Math.round(cur.salary_in_cents / 100 / 160);
  }

  if (curHourlySalary < newAcc.minHourlySalary) {
    newAcc.minHourlySalary = curHourlySalary;
  }

  if (curHourlySalary > newAcc.maxHourlySalary) {
    newAcc.maxHourlySalary = curHourlySalary;
  }

  newAcc.avgHourlySalary = Math.round(
    (acc.avgHourlySalary * curIdx + curHourlySalary) / (curIdx + 1)
  );

  newAcc.totHourlySalary = acc.totHourlySalary + curHourlySalary;

  return newAcc;
};

/** Mutation to add stuff to company */
const UPDATE_COMPANY_INFO = gql`
  mutation UpdateCompanyInfo(
    $slug: String
    $totHourlySalary: Int
    $avgHourlySalary: Int
    $minHourlySalary: Int
    $maxHourlySalary: Int
  ) {
    companyUpdate(
      filter: { slug: $slug }
      data: {
        totHourlySalary: $totHourlySalary
        avgHourlySalary: $avgHourlySalary
        minHourlySalary: $minHourlySalary
        maxHourlySalary: $maxHourlySalary
      }
    ) {
      slug
    }
  }
`;

const mutateCompanyInfo = async (
  slug,
  totHourlySalary,
  avgHourlySalary,
  minHourlySalary,
  maxHourlySalary
) => {
  const response = await client.mutate({
    mutation: UPDATE_COMPANY_INFO,
    variables: {
      slug,
      totHourlySalary,
      avgHourlySalary,
      minHourlySalary,
      maxHourlySalary,
    },
  });

  if (response.error) {
    throw new Error("Company mutation failed");
  }
};

/** Mutation to add stuff to job */
const UPDATE_JOB_INFO = gql`
  mutation UpdateJobInfo(
    $id: ID
    $totHourlySalary: Int
    $avgHourlySalary: Int
    $minHourlySalary: Int
    $maxHourlySalary: Int
  ) {
    jobUpdate(
      filter: { id: $id }
      data: {
        totHourlySalary: $totHourlySalary
        avgHourlySalary: $avgHourlySalary
        minHourlySalary: $minHourlySalary
        maxHourlySalary: $maxHourlySalary
      }
    ) {
      slug
    }
  }
`;

const GET_JOB_INFO = gql`
  query GetJobId {
    jobsList {
      items {
        id
        uniqueIdentifier
      }
    }
  }
`;

const mutateJobInfo = async (
  id,
  totHourlySalary,
  avgHourlySalary,
  minHourlySalary,
  maxHourlySalary
) => {
  const response = await client.mutate({
    mutation: UPDATE_JOB_INFO,
    variables: {
      id,
      totHourlySalary,
      avgHourlySalary,
      minHourlySalary,
      maxHourlySalary,
    },
  });

  if (response.error) {
    throw new Error("Job mutation failed");
  }
};

const updateCompanies = async () => {
  for (const { id, slug } of companyJsonFile) {
    const reviewsAtCompany = reviewJsonFile.filter(
      review => review.company_id === id
    );

    let {
      minHourlySalary,
      maxHourlySalary,
      avgHourlySalary,
      totHourlySalary,
    } = reviewsAtCompany.reduce(salaryReducer, {
      avgHourlySalary: -1,
      totHourlySalary: 0,
      minHourlySalary: Number.MAX_SAFE_INTEGER,
      maxHourlySalary: Number.MIN_SAFE_INTEGER,
    });

    if (minHourlySalary === Number.MAX_SAFE_INTEGER) {
      minHourlySalary = undefined;
    }
    if (maxHourlySalary === Number.MIN_SAFE_INTEGER) {
      maxHourlySalary = undefined;
    }
    if (avgHourlySalary === -1) {
      avgHourlySalary = undefined;
    }
    if (totHourlySalary === 0) {
      totHourlySalary = undefined;
    }

    try {
      await mutateCompanyInfo(
        slug,
        avgHourlySalary,
        minHourlySalary,
        maxHourlySalary
      ); // execute the mutation

      console.log(chalk`{green Success}: ${slug} updated`);
    } catch (e) {
      console.log(chalk`{yellow Error}: Failed to update ${slug}: ${e}`);
    }
  }
};

const updateJobs = async jobInfo => {
  for (const { id, company_id, slug } of jobJsonFile) {
    const reviewsAtJob = reviewJsonFile.filter(review => review.job_id === id);

    let {
      minHourlySalary,
      maxHourlySalary,
      avgHourlySalary,
      totHourlySalary,
    } = reviewsAtJob.reduce(salaryReducer, {
      avgHourlySalary: -1,
      totHourlySalary: 0,
      minHourlySalary: Number.MAX_SAFE_INTEGER,
      maxHourlySalary: Number.MIN_SAFE_INTEGER,
    });

    if (minHourlySalary === Number.MAX_SAFE_INTEGER) {
      minHourlySalary = undefined;
    }
    if (maxHourlySalary === Number.MIN_SAFE_INTEGER) {
      maxHourlySalary = undefined;
    }
    if (avgHourlySalary === -1) {
      avgHourlySalary = undefined;
    }
    if (totHourlySalary === 0) {
      totHourlySalary = undefined;
    }

    const job = jobInfo.find(
      ({ uniqueIdentifier }) => uniqueIdentifier === `j${id}c${company_id}`
    );
    let jobId;

    if (job) {
      jobId = job.id;
    } else {
      throw new Error(`No job with slug ${slug} and company id ${company_id}`);
    }

    try {
      await mutateJobInfo(
        jobId,
        avgHourlySalary,
        minHourlySalary,
        maxHourlySalary
      ); // execute the mutation

      console.log(
        chalk`{green Success}: Job with slug ${slug} and company id ${company_id} updated`
      );
    } catch (e) {
      console.log(e.graphQLErrors[0].locations);
      console.log(
        chalk`{yellow Error}: Failed to update job with slug ${slug} and company id ${company_id}: ${e}`
      );
    }
  }
};

const getJobs = async () => {
  const jobInfoResponse = await client.query({ query: GET_JOB_INFO });
  return jobInfoResponse.data.jobsList.items;
};
getJobs().then(jobInfo => updateJobs(jobInfo));
updateCompanies();
