import faker from "faker";

export const FAKER_SEED = 1234;
export const NUM_COMPANIES = 250;
export const NUM_JOBS = 400;
export const NUM_REVIEWS = 700;

faker.seed(FAKER_SEED);

export const MOCK_COMPANIES_LIST = new Array(NUM_COMPANIES)
  .fill(null)
  .map(() => {
    const companyId = faker.random.uuid();
    const companyName = faker.company.companyName();
    const companyImgUrl = `https://picsum.photos/seed/${companyId}/256`;

    return {
      id: companyId,
      name: companyName,
      slug: faker.helpers.slugify(companyName),
      desc: faker.company.catchPhrase(),

      logoImg: {
        downloadUrl: companyImgUrl,
      },
      logoColor: "",

      numRatings: 0,
      totRating: 0,
      avgRating: 0,
      totLearningMentorshipRating: 0,
      avgLearningMentorshipRating: 0,
      totMeaningfulWorkRating: 0,
      avgMeaningfulWorkRating: 0,
      totWorkLifeBalanceRating: 0,
      avgWorkLifeBalanceRating: 0,

      jobs: [],
      reviews: [],
    };
  });

export const MOCK_JOBS_LIST = new Array(NUM_JOBS).fill(null).map(() => {
  const jobId = faker.random.uuid();
  const jobName = faker.name.jobTitle();

  return {
    id: jobId,
    updatedAt: faker.date.recent(60),

    name: jobName,
    slug: faker.helpers.slugify(jobName),
    location: faker.address.state(),

    minHourlySalary: 0,
    maxHourlySalary: 0,
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

    company: {},
    reviews: [],
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
    id: reviewId,
    updatedAt: faker.date.recent(60),
    legacyUpdatedAt: faker.date.recent(60),

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

    job: {},
    company: {},
  };
});

MOCK_JOBS_LIST.forEach(job => {
  const corresCompanyIdx = faker.random.number(NUM_COMPANIES - 1);

  // establish company-job connection
  job.company = MOCK_COMPANIES_LIST[corresCompanyIdx];
  (MOCK_COMPANIES_LIST[corresCompanyIdx].jobs as any[]).push(job);
});

MOCK_REVIEWS_LIST.forEach(review => {
  const corresJobIdx = faker.random.number(NUM_JOBS - 1);

  // establish job-review connection
  const corresJob = MOCK_JOBS_LIST[corresJobIdx];
  const corresCompany = corresJob.company as any;
  review.job = corresJob;
  (corresJob.reviews as any[]).push(review);
  corresJob.minHourlySalary = Math.min(
    corresJob.minHourlySalary,
    review.salary
  );
  corresJob.maxHourlySalary = Math.max(
    corresJob.maxHourlySalary,
    review.salary
  );
  corresJob.totHourlySalary += review.salary;
  corresJob.avgHourlySalary = Math.round(
    corresJob.totHourlySalary / corresJob.reviews.length
  );
  review.salaryCurrency = corresJob.hourlySalaryCurrency;

  corresJob.totRating += review.overallRating;
  corresJob.avgRating = Math.round(
    corresJob.totRating / corresJob.reviews.length
  );
  corresJob.totLearningMentorshipRating += review.learningMentorshipRating;
  corresJob.avgLearningMentorshipRating = Math.round(
    corresJob.totLearningMentorshipRating / corresJob.reviews.length
  );
  corresJob.totMeaningfulWorkRating += review.meaningfulWorkRating;
  corresJob.avgMeaningfulWorkRating = Math.round(
    corresJob.totMeaningfulWorkRating / corresJob.reviews.length
  );
  corresJob.totWorkLifeBalanceRating += review.workLifeBalanceRating;
  corresJob.avgWorkLifeBalanceRating = Math.round(
    corresJob.totWorkLifeBalanceRating / corresJob.reviews.length
  );

  review.company = corresCompany;
  (corresCompany.reviews as any[]).push(review);
  corresCompany.totRating += review.overallRating;
  corresCompany.avgRating = Math.round(
    corresCompany.totRating / corresCompany.reviews.length
  );
  corresCompany.totLearningMentorshipRating += review.learningMentorshipRating;
  corresCompany.avgLearningMentorshipRating = Math.round(
    corresCompany.totLearningMentorshipRating / corresCompany.reviews.length
  );
  corresCompany.totMeaningfulWorkRating += review.meaningfulWorkRating;
  corresCompany.avgMeaningfulWorkRating = Math.round(
    corresCompany.totMeaningfulWorkRating / corresCompany.reviews.length
  );
  corresCompany.totWorkLifeBalanceRating += review.workLifeBalanceRating;
  corresCompany.avgWorkLifeBalanceRating = Math.round(
    corresCompany.totWorkLifeBalanceRating / corresCompany.reviews.length
  );
});
