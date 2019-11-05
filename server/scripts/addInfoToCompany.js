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

const COMPANIES_BY_SLUG = companyJsonFile.reduce((acc, cur) => {
  acc[cur.slug] = cur;
  return acc;
}, {});

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

/** Mutation to add stuff to company */
const UPDATE_COMPANY_SALARY_WEBSITE = gql`
  mutation UpdateCompanyColor(
    $slug: String
    $medianHourlySalary: Int
    $minHourlySalary: Int
    $maxHourlySalary: Int
    $websiteUrl: String
  ) {
    companyUpdate(
      filter: { slug: $slug }
      data: {
        medianHourlySalary: $medianHourlySalary
        minHourlySalary: $minHourlySalary
        maxHourlySalary: $maxHourlySalary
        websiteUrl: $websiteUrl
      }
    ) {
      slug
    }
  }
`;

const mutateCompanyInfo = async (
  slug,
  medianHourlySalary,
  minHourlySalary,
  maxHourlySalary,
  websiteUrl
) => {
  const response = await client.mutate({
    mutation: UPDATE_COMPANY_SALARY_WEBSITE,
    variables: {
      slug,
      medianHourlySalary,
      minHourlySalary,
      maxHourlySalary,
      websiteUrl,
    },
  });

  if (response.error) {
    throw new Error("Mutation failed");
  }
};

const updateCompanies = async () => {
  for (const { id, slug, website_url, careers_url } of companyJsonFile) {
    const reviewsAtCompany = reviewJsonFile.filter(
      review => review.company_id === id
    );
    const sortedHourlySalaries = reviewsAtCompany.map(cur => {
      let curHourlySalary;
      if (cur.pay_period === "hourly") {
        curHourlySalary = Math.round(cur.salary_in_cents / 100);
      } else if (cur.pay_period === "weekly") {
        curHourlySalary = Math.round(cur.salary_in_cents / 100 / 40);
      } else if (cur.pay_period === "monthly") {
        curHourlySalary = Math.round(cur.salary_in_cents / 100 / 160);
      }

      return curHourlySalary;
    });
    sortedHourlySalaries.sort((a, b) => a - b);

    const websiteUrl = careers_url || website_url || undefined;
    let medianHourlySalary;

    if (sortedHourlySalaries.length <= 0) {
      medianHourlySalary = 0;
    } else {
      medianHourlySalary = Math.round(
        sortedHourlySalaries.length % 2
          ? sortedHourlySalaries[(sortedHourlySalaries.length - 1) / 2]
          : (sortedHourlySalaries[sortedHourlySalaries.length / 2 - 1] +
              sortedHourlySalaries[sortedHourlySalaries.length / 2]) /
              2
      );
    }

    let { minHourlySalary, maxHourlySalary } = reviewsAtCompany.reduce(
      (acc, cur) => {
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

        return newAcc;
      },
      {
        minHourlySalary: Number.MAX_SAFE_INTEGER,
        maxHourlySalary: Number.MIN_SAFE_INTEGER,
      }
    );

    if (minHourlySalary === Number.MAX_SAFE_INTEGER) {
      minHourlySalary = undefined;
    }
    if (maxHourlySalary === Number.MIN_SAFE_INTEGER) {
      maxHourlySalary = undefined;
    }

    try {
      await mutateCompanyInfo(
        slug,
        medianHourlySalary,
        minHourlySalary,
        maxHourlySalary,
        websiteUrl
      ); // execute the mutation

      console.log(chalk`{green Success}: ${slug} updated`);
    } catch (e) {
      console.log(chalk`{yellow Error}: Failed to update ${slug}: ${e}`);
    }
  }
};

updateCompanies();
