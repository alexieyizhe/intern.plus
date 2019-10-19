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
    value: "tot_rating",
    default: 0,
  },
  {
    label: "avgRating",
    value: "avg_rating",
    default: 0,
  },
  {
    label: "logoSrc",
    value: "logo_url",
  },
];

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
    label: "companyName",
    value: row =>
      companyJsonFile.filter(company => company.id === row.company_id)[0].name,
  },
  {
    label: "companyId",
    value: row =>
      companyJsonFile.filter(company => company.id === row.company_id)[0].id,
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
    value: row => (row["tot_rating"] || 0).toFixed(1),
  },
  {
    label: "avgRating",
    value: row => (row["avg_rating"] || 0).toFixed(1),
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
];

const reviewFields = [
  {
    label: "author",
    value: () => "Anonymous",
  },
  {
    label: "authorId",
    value: "user_id",
  },
  {
    label: "anonymous",
    value: "anonymous",
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
    label: "companyName",
    value: row =>
      companyJsonFile.filter(company => company.id === row.company_id)[0].name,
  },
  {
    label: "companyId",
    value: row =>
      companyJsonFile.filter(company => company.id === row.company_id)[0].id,
  },
  {
    label: "jobName",
    value: row => jobJsonFile.filter(job => job.id === row.job_id)[0].title,
  },
  {
    label: "jobId",
    value: row => jobJsonFile.filter(job => job.id === row.job_id)[0].id,
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
