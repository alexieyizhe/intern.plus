const { Parser } = require("json2csv"); // eslint-disable-line
const fs = require("fs"); // eslint-disable-line

const COMPANY_KEY = "company";
const JOB_KEY = "job";
const REVIEW_KEY = "user_review";

const companyJsonFile = require(`./${COMPANY_KEY}.json`); // eslint-disable-line
const jobJsonFile = require(`./${JOB_KEY}.json`); // eslint-disable-line
const reviewJsonFile = require(`./${REVIEW_KEY}.json`); // eslint-disable-line

const reduceToIdMap = file =>
  file.reduce((acc, curItem) => {
    if (acc[curItem.id]) {
      console.log(curItem.id);
      process.exit(1);
    } else {
      acc[curItem.id] = curItem;
    }
    return acc;
  }, {});

const companiesById = reduceToIdMap(companyJsonFile);
const jobsById = reduceToIdMap(jobJsonFile);
const reviewsById = reduceToIdMap(reviewJsonFile);

/**
 * **COMPANY**
 */
const companyFields = [
  {
    label: "name",
    value: "name",
  },
  {
    label: "slug",
    value: "slug",
  },
  {
    label: "desc",
    value: "description",
  },
  {
    label: "totRating",
    value: row =>
      Math.round(
        reviewJsonFile
          .filter(review => review.company_id === row.id)
          .reduce((acc, cur) => acc + (cur.overall_rating || 0), 0)
      ),
  },
  {
    label: "avgRating",
    value: row => {
      const reviewsForCompany = reviewJsonFile.filter(
        review => review.company_id === row.id
      );

      const reviewRatingSum = reviewsForCompany.reduce(
        (acc, cur) => acc + (cur.overall_rating || 0),
        0
      );

      return (reviewsForCompany.length
        ? reviewRatingSum / reviewsForCompany.length
        : 0
      ).toFixed(1);
    },
  },
  {
    label: "totLearningMentorshipRating",
    value: row =>
      Math.round(
        reviewJsonFile
          .filter(review => review.company_id === row.id)
          .reduce((acc, cur) => acc + (cur.mentorship_rating || 0), 0)
      ),
  },
  {
    label: "avgLearningMentorshipRating",
    value: row => {
      const reviewsForCompany = reviewJsonFile.filter(
        review => review.company_id === row.id
      );

      const reviewRatingSum = reviewsForCompany.reduce(
        (acc, cur) => acc + (cur.mentorship_rating || 0),
        0
      );

      return (reviewsForCompany.length
        ? reviewRatingSum / reviewsForCompany.length
        : 0
      ).toFixed(1);
    },
  },
  {
    label: "totMeaningfulWorkRating",
    value: row =>
      Math.round(
        reviewJsonFile
          .filter(review => review.company_id === row.id)
          .reduce((acc, cur) => acc + (cur.meaningful_work_rating || 0), 0)
      ),
  },
  {
    label: "avgMeaningfulWorkRating",
    value: row => {
      const reviewsForCompany = reviewJsonFile.filter(
        review => review.company_id === row.id
      );

      const reviewRatingSum = reviewsForCompany.reduce(
        (acc, cur) => acc + (cur.meaningful_work_rating || 0),
        0
      );

      return (reviewsForCompany.length
        ? reviewRatingSum / reviewsForCompany.length
        : 0
      ).toFixed(1);
    },
  },
  {
    label: "totWorkLifeBalanceRating",
    value: row =>
      Math.round(
        reviewJsonFile
          .filter(review => review.company_id === row.id)
          .reduce((acc, cur) => acc + (cur.work_life_balance_rating || 0), 0)
      ),
  },
  {
    label: "avgWorkLifeBalanceRating",
    value: row => {
      const reviewsForCompany = reviewJsonFile.filter(
        review => review.company_id === row.id
      );

      const reviewRatingSum = reviewsForCompany.reduce(
        (acc, cur) => acc + (cur.work_life_balance_rating || 0),
        0
      );

      return (reviewsForCompany.length
        ? reviewRatingSum / reviewsForCompany.length
        : 0
      ).toFixed(1);
    },
  },
  {
    label: "logoSrc",
    value: "logo_url",
  },
  {
    label: "uniqueIdentifier",
    value: row => `c${row.id}`,
  },
  {
    label: "numRatings",
    value: row =>
      reviewJsonFile.filter(review => review.company_id === row.id).length,
  },
];

/**
 * **JOB**
 */
const jobFields = [
  {
    label: "slug",
    value: "slug",
  },
  {
    label: "name",
    value: "title",
  },
  {
    label: "location",
    value: "location",
  },
  {
    label: "minHourlySalary",
    value: row => Math.round((row["min_salary_in_cents"] || 0) / 100 / 160),
  },
  {
    label: "maxHourlySalary",
    value: row => Math.round((row["max_salary_in_cents"] || 0) / 100 / 160),
  },
  {
    label: "avgHourlySalary",
    value: row => Math.round((row["avg_salary_in_cents"] || 0) / 100 / 160),
  },
  {
    label: "salaryCurrency",
    value: row => {
      for (const reviewRow of reviewJsonFile) {
        if (reviewRow.job_id === row.id) return reviewRow.currency;
      }
    },
  },
  {
    label: "totRating",
    value: row =>
      reviewJsonFile
        .filter(review => review.job_id === row.id)
        .reduce((acc, cur) => acc + (cur.overall_rating || 0), 0),
  },
  {
    label: "avgRating",
    value: row => {
      const allReviewsForJob = reviewJsonFile.filter(
        review => review.job_id === row.id
      );

      const sum = allReviewsForJob.reduce(
        (acc, cur) => acc + (cur.overall_rating || 0),
        0
      );

      return (allReviewsForJob.length
        ? sum / allReviewsForJob.length
        : 0
      ).toFixed(1);
    },
  },
  {
    label: "totLearningMentorshipRating",
    value: row =>
      reviewJsonFile
        .filter(review => review.job_id === row.id)
        .reduce((acc, cur) => acc + (cur.mentorship_rating || 0), 0),
  },
  {
    label: "avgLearningMentorshipRating",
    value: row => {
      const allReviewsForJob = reviewJsonFile.filter(
        review => review.job_id === row.id
      );
      const sum = allReviewsForJob.reduce(
        (acc, cur) => acc + (cur.mentorship_rating || 0),
        0
      );
      return (allReviewsForJob.length
        ? sum / allReviewsForJob.length
        : 0
      ).toFixed(1);
    },
  },
  {
    label: "totMeaningfulWorkRating",
    value: row =>
      reviewJsonFile
        .filter(review => review.job_id === row.id)
        .reduce((acc, cur) => acc + (cur.meaningful_work_rating || 0), 0),
  },
  {
    label: "avgMeaningfulWorkRating",
    value: row => {
      const allReviewsForJob = reviewJsonFile.filter(
        review => review.job_id === row.id
      );

      const sum = allReviewsForJob.reduce(
        (acc, cur) => acc + (cur.meaningful_work_rating || 0),
        0
      );

      return (allReviewsForJob.length
        ? sum / allReviewsForJob.length
        : 0
      ).toFixed(1);
    },
  },
  {
    label: "totWorkLifeBalanceRating",
    value: row =>
      reviewJsonFile
        .filter(review => review.job_id === row.id)
        .reduce((acc, cur) => acc + (cur.work_life_balance_rating || 0), 0),
  },
  {
    label: "avgWorkLifeBalanceRating",
    value: row => {
      const allReviewsForJob = reviewJsonFile.filter(
        review => review.job_id === row.id
      );
      const sum = allReviewsForJob.reduce(
        (acc, cur) => acc + (cur.work_life_balance_rating || 0),
        0
      );

      return (allReviewsForJob.length
        ? sum / allReviewsForJob.length
        : 0
      ).toFixed(1);
    },
  },
  {
    label: "uniqueIdentifier",
    value: row => `j${row.id}c${row.company_id}`,
  },
  {
    label: "numRatings",
    value: row =>
      reviewJsonFile.filter(review => review.job_id === row.id).length,
  },
];

/**
 * **REVIEW**
 */
const reviewFields = [
  {
    label: "author",
    value: () => "Anonymous",
  },
  {
    label: "body",
    value: "description",
  },
  {
    label: "salary",
    value: row => Math.round((row.salary_in_cents || 0) / 100),
  },
  {
    label: "salaryCurrency",
    value: "currency",
  },
  {
    label: "salaryPeriod",
    value: "pay_period",
  },
  {
    label: "overallRating",
    value: "overall_rating",
  },
  {
    label: "learningMentorshipRating",
    value: "mentorship_rating",
  },
  {
    label: "meaningfulWorkRating",
    value: "meaningful_work_rating",
  },
  {
    label: "workLifeBalanceRating",
    value: "work_life_balance_rating",
  },
  {
    label: "legacyUpdatedAt",
    value: "updated_at",
  },
  {
    label: "uniqueIdentifier",
    value: row => `r${row.id}j${row.job_id}c${row.company_id}`,
  },
];

const dict = {
  "-c": {
    key: COMPANY_KEY,
    fields: companyFields,
    file: companyJsonFile,
  },
  "-j": {
    key: JOB_KEY,
    fields: jobFields,
    file: jobJsonFile,
  },
  "-r": {
    key: REVIEW_KEY,
    fields: reviewFields,
    file: reviewJsonFile,
  },
};

// review, company, or job
const typeArg = process.argv[2];

if (!["-c", "-j", "-r"].includes(typeArg)) {
  console.log(
    "One of '-c', '-j', or '-r' must be specified to indicate which file type to convert!"
  );
  process.exit(1);
}

const dictEntry = dict[typeArg];
const json2csvParser = new Parser({ fields: dictEntry.fields });
const jsonInput = dictEntry.file;

console.log("Parsing...");
const csvOutput = json2csvParser.parse(jsonInput);

console.log(`Outputting to ./migration/${dictEntry.key}.csv`);
fs.writeFileSync(`./migration/${dictEntry.key}.csv`, csvOutput, () => {});

console.log("Done migration!");
