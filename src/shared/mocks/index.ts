/* eslint-disable @typescript-eslint/no-explicit-any */
import faker from "faker";

export const FAKER_SEED = 1234;
faker.seed(FAKER_SEED);

export interface IIdQueryParam {
  id: string;
}

export interface ISlugQueryParam {
  slug: string;
}

export interface ISearchQueryParams {
  query: string;
  minSalary?: number;
  maxSalary?: number;
  locations: string[];
  offset: number;
  limit: number;
}

export const getRandomColor = () =>
  "hsl(" +
  faker.random.number(360) +
  "," +
  (15 + faker.random.number(60)) +
  "%," +
  (45 + faker.random.number(10)) +
  "%)";

const getHourlySalary = (amt: number, period: string) => {
  switch (period) {
    case "monthly":
      return Math.round(amt / 160);

    case "weekly":
      return Math.round(amt / 40);

    default:
      return amt;
  }
};

export const NUM_COMPANIES = 250;
export const NUM_JOBS = 400; // must be larger than NUM_COMPANIES
export const NUM_REVIEWS = 700; // must be larger than NUM_JOBS

export const MOCK_COMPANIES_LIST = new Array(NUM_COMPANIES)
  .fill(null)
  .map(() => {
    const companyId = faker.random.uuid();
    const companyName = faker.company.companyName();
    const companyImgUrl = `https://picsum.photos/seed/${companyId}/256`;

    return {
      __typename: "Company" as "Company",
      id: companyId,
      name: companyName,
      slug: faker.helpers.slugify(companyName),
      desc: faker.company.catchPhrase(),

      medianHourlySalary: NaN,
      minHourlySalary: Number.MAX_SAFE_INTEGER,
      maxHourlySalary: Number.MIN_SAFE_INTEGER,
      hourlySalaryCurrency: faker.random.arrayElement(["CAD", "USD", "EUR"]),

      logoImg: {
        __typename: "File" as "File",
        downloadUrl: companyImgUrl,
      },
      logoColor: getRandomColor(),
      websiteUrl: faker.internet.url,

      numRatings: 0,
      totRating: 0,
      avgRating: 0,
      totLearningMentorshipRating: 0,
      avgLearningMentorshipRating: 0,
      totMeaningfulWorkRating: 0,
      avgMeaningfulWorkRating: 0,
      totWorkLifeBalanceRating: 0,
      avgWorkLifeBalanceRating: 0,

      jobs: {
        __typename: "JobListResponse" as "JobListResponse",
        count: 0,
        items: [],
      },
      reviews: {
        __typename: "ReviewListResponse" as "ReviewListResponse",
        count: 0,
        items: [],
      },
    };
  });

export const MOCK_JOBS_LIST = new Array(NUM_JOBS).fill(null).map(() => {
  const jobId = faker.random.uuid();
  const jobName = faker.name.jobTitle();

  return {
    __typename: "Job" as "Job",
    id: jobId,
    updatedAt: faker.date.recent(60),

    name: jobName,
    slug: faker.helpers.slugify(jobName),
    location: faker.address.state(),

    minHourlySalary: Number.MAX_SAFE_INTEGER,
    maxHourlySalary: Number.MIN_SAFE_INTEGER,
    avgHourlySalary: 0,
    totHourlySalary: 0,
    hourlySalaryCurrency: faker.random.arrayElement(["CAD", "USD", "EUR"]),

    totRating: 0,
    avgRating: 0,
    totLearningMentorshipRating: 0,
    avgLearningMentorshipRating: 0,
    totMeaningfulWorkRating: 0,
    avgMeaningfulWorkRating: 0,
    totWorkLifeBalanceRating: 0,
    avgWorkLifeBalanceRating: 0,

    company: {
      __typename: "Company" as "Company",
      name: "",
      slug: "",
      logoColor: "",
    },
    reviews: {
      __typename: "ReviewListResponse" as "ReviewListResponse",
      count: 0,
      items: [],
    },
  };
});

export const MOCK_REVIEWS_LIST = new Array(NUM_REVIEWS).fill(null).map(() => {
  const reviewId = faker.random.uuid();
  const currencyPeriod = faker.random.arrayElement([
    "weekly",
    "hourly",
    "monthly",
  ]);
  const salaryNum = ({
    hourly: faker.random.number({ min: 20, max: 50 }),
    weekly: faker.random.number({ min: 800, max: 3000 }),
    monthly: faker.random.number({ min: 4000, max: 12000 }),
  } as any)[currencyPeriod];

  return {
    __typename: "Review" as "Review",
    id: reviewId,
    createdAt: faker.date.recent(100).toString(),
    updatedAt: faker.date.recent(60).toString(),
    legacyUpdatedAt: faker.date.recent(60).toString(),

    author: faker.name.findName(),
    body: faker.hacker.phrase(),
    tags: faker.lorem.words(),

    salary: salaryNum,
    salaryCurrency: "",
    salaryPeriod: currencyPeriod,

    overallRating: faker.random.number({ min: 1, max: 5 }),
    learningMentorshipRating: faker.random.number({ min: 1, max: 5 }),
    meaningfulWorkRating: faker.random.number({ min: 1, max: 5 }),
    workLifeBalanceRating: faker.random.number({ min: 1, max: 5 }),

    isLegacy: faker.random.boolean(),
    isAnonymous: faker.random.boolean(),

    job: {
      __typename: "Job" as "Job",
      name: "",
      location: "",
    },
    company: {
      __typename: "Company" as "Company",
      name: "",
      slug: "",
      logoColor: "",
    },
  };
});

MOCK_JOBS_LIST.forEach((job, i) => {
  const corresCompanyIdx =
    i < NUM_COMPANIES ? i : faker.random.number(NUM_COMPANIES - 1); // assign each company at least one job
  const corresCompany = MOCK_COMPANIES_LIST[corresCompanyIdx];
  // establish company-job connection
  job.company = corresCompany;
  corresCompany.jobs.count++;
  (corresCompany.jobs.items as any[]).push(job);
});

MOCK_REVIEWS_LIST.forEach((review, i) => {
  const corresJobIdx = i < NUM_JOBS ? i : faker.random.number(NUM_JOBS - 1); // assign each job at least 1 review

  // establish job-review connection
  const corresJob = MOCK_JOBS_LIST[corresJobIdx];
  const corresCompany = corresJob.company as any;
  review.job = corresJob;
  corresJob.reviews.count++;
  (corresJob.reviews.items as any[]).push(review);

  const reviewHourlySalary = getHourlySalary(
    review.salary,
    review.salaryPeriod
  );
  corresJob.minHourlySalary = Math.min(
    corresJob.minHourlySalary,
    reviewHourlySalary
  );
  corresJob.maxHourlySalary = Math.max(
    corresJob.maxHourlySalary,
    reviewHourlySalary
  );
  corresJob.totHourlySalary += reviewHourlySalary;
  corresJob.avgHourlySalary = Math.round(
    corresJob.totHourlySalary / corresJob.reviews.count
  );
  review.salaryCurrency = corresJob.hourlySalaryCurrency;

  corresJob.totRating += review.overallRating;
  corresJob.avgRating = Math.round(
    corresJob.totRating / corresJob.reviews.count
  );
  corresJob.totLearningMentorshipRating += review.learningMentorshipRating;
  corresJob.avgLearningMentorshipRating = Math.round(
    corresJob.totLearningMentorshipRating / corresJob.reviews.count
  );
  corresJob.totMeaningfulWorkRating += review.meaningfulWorkRating;
  corresJob.avgMeaningfulWorkRating = Math.round(
    corresJob.totMeaningfulWorkRating / corresJob.reviews.count
  );
  corresJob.totWorkLifeBalanceRating += review.workLifeBalanceRating;
  corresJob.avgWorkLifeBalanceRating = Math.round(
    corresJob.totWorkLifeBalanceRating / corresJob.reviews.count
  );

  review.company = corresCompany;
  corresCompany.reviews.count++;
  (corresCompany.reviews.items as any[]).push(review);

  corresCompany.minHourlySalary = Math.min(
    corresCompany.minHourlySalary,
    reviewHourlySalary
  );
  corresCompany.maxHourlySalary = Math.max(
    corresCompany.maxHourlySalary,
    reviewHourlySalary
  );

  corresCompany.totRating += review.overallRating;
  corresCompany.avgRating = Math.round(
    corresCompany.totRating / corresCompany.reviews.count
  );
  corresCompany.totLearningMentorshipRating += review.learningMentorshipRating;
  corresCompany.avgLearningMentorshipRating = Math.round(
    corresCompany.totLearningMentorshipRating / corresCompany.reviews.count
  );
  corresCompany.totMeaningfulWorkRating += review.meaningfulWorkRating;
  corresCompany.avgMeaningfulWorkRating = Math.round(
    corresCompany.totMeaningfulWorkRating / corresCompany.reviews.count
  );
  corresCompany.totWorkLifeBalanceRating += review.workLifeBalanceRating;
  corresCompany.avgWorkLifeBalanceRating = Math.round(
    corresCompany.totWorkLifeBalanceRating / corresCompany.reviews.count
  );
});

MOCK_COMPANIES_LIST.forEach((company, i) => {
  const sortedHourlySalaries = (company.reviews.items as any).map(
    (review: any) => {
      let curHourlySalary;
      if (review.salaryPeriod === "hourly") {
        curHourlySalary = Math.round(review.salary);
      } else if (review.salaryPeriod === "weekly") {
        curHourlySalary = Math.round(review.salary / 40);
      } else if (review.salaryPeriod === "monthly") {
        curHourlySalary = Math.round(review.salary / 160);
      }

      return curHourlySalary;
    }
  );
  sortedHourlySalaries.sort((a: number, b: number) => a - b);

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

  company.medianHourlySalary = medianHourlySalary;
});

export const MOCK_COMPANIES = MOCK_COMPANIES_LIST.reduce(
  (acc, curCompany) => {
    acc[curCompany.slug] = curCompany;
    return acc;
  },
  {} as any
);

export const MOCK_JOBS = MOCK_JOBS_LIST.reduce(
  (acc, curJob) => {
    acc[curJob.id] = curJob;
    return acc;
  },
  {} as any
);

export const MOCK_REVIEWS = MOCK_REVIEWS_LIST.reduce(
  (acc, curReview) => {
    acc[curReview.id] = curReview;
    return acc;
  },
  {} as any
);

export const MOCK_LOCATIONS = Array.from(
  MOCK_JOBS_LIST.reduce((acc, cur) => {
    acc.add(cur.location);
    return acc;
  }, new Set<string>())
);
