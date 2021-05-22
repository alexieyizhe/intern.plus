/**
 * ⚠️ 🚧 🛑 WARNING ⚠️ 🚧 🛑
 * This code is incredibly ugly and not even remotely close to optimized. Its purpose was to conduct one-time quick and dirty cleanup and transformation of the data dump from a prior backend database. Proceed with caution D:
 */

const firebase = require("firebase");
const admin = require("firebase-admin");
const fs = require("fs");

const firebaseConfig = {
  apiKey: "AIzaSyD_qfQfNs-KrPLbEM_s5WOUJfu0fH_6CeY",
  authDomain: "intern-plus.firebaseapp.com",
  projectId: "intern-plus",
  storageBucket: "intern-plus.appspot.com",
  messagingSenderId: "215884011864",
  appId: "1:215884011864:web:3368e2faecc4bdd96bed2d",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const noContents = (v) => v === "" || !v;

const COMPANY_JOBS = {};
const JOB_REVIEWS = {};
const COMPANY_REVIEWS = {};
const REVIEW_JOB = {};
const REVIEW_COMPANY = {};
const JOB_COMPANY = {};

const reviewsToJobsData = fs.readFileSync("./data-join-jobs-reviews", "utf8");
const jobsToCompaniesData = fs.readFileSync(
  "./data-join-companies-jobs",
  "utf8"
);
const reviewsToCompaniesData = fs.readFileSync(
  "./data-join-companies-reviews",
  "utf8"
);

const joinMatchRegex = /\('([a-zA-Z0-9]{25})','([a-zA-Z0-9]{25})','.{55}'\)/g;
const rtjMatches = [...reviewsToJobsData.matchAll(joinMatchRegex)];
rtjMatches.forEach((match) => {
  const [originalRtj, reviewId, correspondingJobId] = match;

  // const review = REVIEWS[reviewId];
  // const correspondingJob = JOBS[correspondingJobId];

  // if(!review || !correspondingJob) {
  //   console.error("No match for review", reviewId, "to job", correspondingJobId);
  // }

  const jobMapExists = !!JOB_REVIEWS[correspondingJobId];

  if (!jobMapExists) JOB_REVIEWS[correspondingJobId] = [];

  JOB_REVIEWS[correspondingJobId].push(reviewId);
  REVIEW_JOB[reviewId] = correspondingJobId;
});

const jtcMatches = [...jobsToCompaniesData.matchAll(joinMatchRegex)];
jtcMatches.forEach((match) => {
  const [originalJtc, jobId, correspondingCompanyId] = match;

  // const job = JOBS[jobId];
  // const correspondingCompany = COMPANIES[correspondingCompanyId];

  // if(!job || !correspondingCompany) {
  //   console.error("No match for job", jobId, "to company", correspondingCompanyId);
  // }

  const companyMapExists = !!COMPANY_JOBS[correspondingCompanyId];

  if (!companyMapExists) COMPANY_JOBS[correspondingCompanyId] = [];

  COMPANY_JOBS[correspondingCompanyId].push(jobId);
  JOB_COMPANY[jobId] = correspondingCompanyId;
});

const rtcMatches = [...reviewsToCompaniesData.matchAll(joinMatchRegex)];
rtcMatches.forEach((match) => {
  const [originalRtc, reviewId, correspondingCompanyId] = match;

  // const review = REVIEWS[reviewId];
  // const correspondingCompany = COMPANIES[correspondingCompanyId];

  // if(!review || !correspondingCompany) {
  //   console.error("No match for review", reviewId, "to company", correspondingCompanyId);
  // }

  const companyMapExists = !!COMPANY_REVIEWS[correspondingCompanyId];

  if (!companyMapExists) COMPANY_REVIEWS[correspondingCompanyId] = [];

  COMPANY_REVIEWS[correspondingCompanyId].push(reviewId);
  REVIEW_COMPANY[reviewId] = correspondingCompanyId;
});

const COMPANIES = {};
const JOBS = {};
const REVIEWS = {};
const ORPHAN_REVIEWS = {};
const SPAM_REVIEWS = {};

const companiesData = fs.readFileSync("./data-companies", "utf8");
const jobsData = fs.readFileSync("./data-jobs", "utf8");
const reviewsData = fs.readFileSync("./data-reviews", "utf8");

companiesData.split("\n").forEach((v) => {
  const inside = v.match(/^\((.*)\)$/);
  try {
    const [
      companyId,
      createdAt,
      updatedAt,
      ,
      companyName,
      companyDesc,
      companySlug,
    ] = inside[1]
      .replace(/NULL/g, "''")
      .split("',")
      .map((v) => {
        const stripped = v.replace(/'/g, "");
        return stripped === "''" || stripped === "" || !stripped
          ? null
          : stripped.replace(/\\/g, "'");
      });
    if (
      noContents(companyId) ||
      noContents(createdAt) ||
      noContents(updatedAt) ||
      noContents(companyName) ||
      noContents(companySlug)
    ) {
      console.error({
        companyId,
        createdAt,
        updatedAt,
        companyName,
        companyDesc,
        companySlug,
      });
    }

    if (
      !COMPANY_REVIEWS[companyId] ||
      !COMPANY_JOBS[companyId] ||
      COMPANY_JOBS[companyId].length === 0
    ) {
      // console.error(companyId, companyName);
    } else {
      COMPANIES[companyId] = {
        companyId,
        createdAt,
        updatedAt,
        companyName,
        companyDesc,
        companySlug,
      };
    }
  } catch (e) {
    console.error(e, v);
  }
});

jobsData.split("\n").forEach((v) => {
  const inside = v.match(/^\((.*)\)$/);
  try {
    let [jobId, createdAt, updatedAt, , jobSlug, jobName, , location] =
      inside[1]
        .replace(/NULL/g, "''")
        .split(",'")
        .map((v) => {
          const stripped = v.replace(/'/g, "");
          return stripped === "''" || stripped === "" || !stripped
            ? null
            : stripped.replace(/\\/g, "'");
        });
    updatedAt = updatedAt.split(",")[0];
    jobName = jobName.split(",")[0];

    if (
      noContents(jobSlug) ||
      noContents(jobId) ||
      noContents(createdAt) ||
      noContents(updatedAt) ||
      noContents(jobName) ||
      noContents(location)
    ) {
      console.error({
        jobId,
        createdAt,
        updatedAt,
        jobSlug,
        jobName,
        location,
      });
    }

    if (
      !JOB_COMPANY[jobId] ||
      !JOB_REVIEWS[jobId] ||
      JOB_REVIEWS[jobId].length === 0
    ) {
      // console.error(jobId, jobName);
    } else {
      JOBS[jobId] = { jobId, createdAt, updatedAt, jobSlug, jobName, location };
    }
  } catch (e) {
    console.error(e, v);
  }
});

const reviewsRegex =
  /^\('([a-zA-Z0-9]{25})','([0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}.[0-9]{6})','([0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}.[0-9]{6})',([0-9]+),(?:'(.*)'|(NULL)),'(.*)',(-{0,1}[0-9]+),'(.*)','(monthly|weekly|hourly)',([0-9]\.[0-9]),(?:([0-9]\.[0-9])|(NULL)),(?:([0-9]\.[0-9])|(NULL)),(?:([0-9]\.[0-9])|(NULL)),(?:'([a-zA-Z0-9-_ ]*(?:,[a-zA-Z0-9-_ ]+)*)'|(NULL)),(0|1),(0|1),(.*)\)$/;

reviewsData.split("\n").forEach((v) => {
  try {
    const matches = reviewsRegex.exec(v);
    const [
      original,
      reviewId,
      reviewCreatedAt,
      reviewUpdatedAt,
      reviewDeletedAt,
      ,
      ,
      reviewBody,
      reviewSalaryAmt,
      reviewSalaryCurrency,
      reviewSalaryPeriod,
      overallRating,
      learningMentorshipRating,
      ,
      meaningfulWorkRating,
      ,
      workLifeBalanceRating,
      ,
      reviewTags,
      ,
      isSpam,
      isLegacy,
      rest,
    ] = matches;
    if (
      noContents(reviewId) ||
      noContents(reviewCreatedAt) ||
      noContents(reviewUpdatedAt) ||
      noContents(reviewBody) ||
      noContents(reviewSalaryAmt) ||
      noContents(reviewSalaryCurrency) ||
      noContents(reviewSalaryPeriod) ||
      noContents(overallRating) ||
      noContents(learningMentorshipRating) ||
      noContents(meaningfulWorkRating) ||
      noContents(workLifeBalanceRating) ||
      noContents(isSpam) ||
      noContents(isLegacy) ||
      reviewSalaryCurrency.length !== 3
    ) {
      console.log({
        original,
        reviewId,
        reviewCreatedAt,
        reviewUpdatedAt,
        reviewDeletedAt,
        reviewBody,
        reviewSalaryAmt,
        reviewSalaryCurrency,
        reviewSalaryPeriod,
        overallRating,
        learningMentorshipRating,
        meaningfulWorkRating,
        workLifeBalanceRating,
        reviewTags,
        isSpam,
        isLegacy,
        rest,
      });
    }

    if (!["hourly", "weekly", "monthly"].includes(reviewSalaryPeriod)) {
      console.error("wtf", reviewId);
    }

    if (parseInt(isSpam)) {
      SPAM_REVIEWS[reviewId] = {
        original,
        reviewId,
        reviewCreatedAt,
        reviewUpdatedAt,
        reviewDeletedAt,
        reviewBody: reviewBody
          .replaceAll("\\'", "'")
          .replaceAll('\\"', '"')
          .replaceAll("\\n", "\n"),
        reviewSalaryAmt: parseFloat(reviewSalaryAmt),
        reviewSalaryCurrency,
        reviewSalaryPeriod,
        overallScore: parseFloat(overallRating),
        learningMentorshipScore: parseFloat(learningMentorshipRating),
        meaningfulWorkScore: parseFloat(meaningfulWorkRating),
        workLifeBalanceScore: parseFloat(workLifeBalanceRating),
        reviewTags: reviewTags ? reviewTags.split(",") : reviewTags,
        isSpam: Boolean(parseInt(isSpam)),
        isLegacy: Boolean(parseInt(isLegacy)),
        rest,
      };
    } else if (!REVIEW_COMPANY[reviewId]) {
      ORPHAN_REVIEWS[reviewId] = {
        original,
        reviewId,
        reviewCreatedAt,
        reviewUpdatedAt,
        reviewDeletedAt,
        reviewBody: reviewBody
          .replaceAll("\\'", "'")
          .replaceAll('\\"', '"')
          .replaceAll("\\n", "\n"),
        reviewSalaryAmt: parseFloat(reviewSalaryAmt),
        reviewSalaryCurrency,
        reviewSalaryPeriod,
        overallScore: parseFloat(overallRating),
        learningMentorshipScore: parseFloat(learningMentorshipRating),
        meaningfulWorkScore: parseFloat(meaningfulWorkRating),
        workLifeBalanceScore: parseFloat(workLifeBalanceRating),
        reviewTags: reviewTags ? reviewTags.split(",") : reviewTags,
        isSpam: Boolean(parseInt(isSpam)),
        isLegacy: Boolean(parseInt(isLegacy)),
        rest,
      };
    } else {
      const factor =
        reviewSalaryPeriod === "hourly"
          ? 1
          : reviewSalaryPeriod === "weekly"
          ? 40
          : reviewSalaryPeriod === "monthly"
          ? 160
          : 1;
      const hourly = parseFloat(reviewSalaryAmt) / factor;
      REVIEWS[reviewId] = {
        original,
        reviewId,
        reviewCreatedAt,
        reviewUpdatedAt,
        reviewDeletedAt,
        reviewBody: reviewBody
          .replaceAll("\\'", "'")
          .replaceAll('\\"', '"')
          .replaceAll("\\n", "\n"),
        reviewSalaryAmt: parseFloat(reviewSalaryAmt),
        reviewSalaryAmtHourly:
          reviewSalaryAmt === -1 ? reviewSalaryAmt : hourly,
        reviewSalaryCurrency,
        reviewSalaryPeriod,
        overallScore: parseFloat(overallRating),
        learningMentorshipScore: parseFloat(learningMentorshipRating),
        meaningfulWorkScore: parseFloat(meaningfulWorkRating),
        workLifeBalanceScore: parseFloat(workLifeBalanceRating),
        reviewTags: reviewTags ? reviewTags.split(",") : reviewTags,
        isSpam: Boolean(parseInt(isSpam)),
        isLegacy: Boolean(parseInt(isLegacy)),
        rest,
      };
    }
  } catch (e) {
    console.error(e, v);
  }
});

console.log("---- company count:", Object.keys(COMPANIES).length);
console.log("# with jobs:", Object.keys(COMPANY_JOBS).length);
console.log("# with reviews:", Object.keys(COMPANY_REVIEWS).length);

console.log("---- job count:", Object.keys(JOBS).length);
console.log("# with company:", Object.keys(JOB_COMPANY).length);
console.log("# with reviews:", Object.keys(JOB_REVIEWS).length);

console.log("---- review count:", Object.keys(REVIEWS).length);
console.log("# with company:", Object.keys(REVIEW_COMPANY).length);
console.log("# with job:", Object.keys(REVIEW_JOB).length);
console.log("# orphan:", Object.keys(ORPHAN_REVIEWS).length);
console.log("# spam:", Object.keys(SPAM_REVIEWS).length);

const companiesWriteData = Object.values(COMPANIES).map((company) => {
  const companyJobIds = COMPANY_JOBS[company.companyId];
  const companyReviewIds = COMPANY_REVIEWS[company.companyId];

  if (
    !companyJobIds ||
    companyJobIds.length === 0 ||
    !companyReviewIds ||
    companyReviewIds.length === 0
  ) {
    console.error("wtf", company.companyId);
  }

  return {
    id: company.companyId,
    slug: company.companySlug,
    name: company.companyName,
    description: company.companyDesc ?? null,
    logo: null,
    websiteUrl: `http://www.google.com/search?q=${company.companyName}&btnI`,
    jobIds: companyJobIds,
    jobCount: companyJobIds.length,
    reviewIds: companyReviewIds,
    reviewCount: companyReviewIds.length,
    scoreTotals: {
      overall: companyReviewIds.reduce(
        (acc, curReviewId) => acc + REVIEWS[curReviewId].overallScore,
        0
      ),
      learningMentorship: companyReviewIds.reduce(
        (acc, curReviewId) =>
          acc + REVIEWS[curReviewId].learningMentorshipScore,
        0
      ),
      meaningfulWork: companyReviewIds.reduce(
        (acc, curReviewId) => acc + REVIEWS[curReviewId].meaningfulWorkScore,
        0
      ),
      workLifeBalance: companyReviewIds.reduce(
        (acc, curReviewId) => acc + REVIEWS[curReviewId].workLifeBalanceScore,
        0
      ),
    },
    createdAt: new Date(company.createdAt),
    updatedAt: new Date(company.updatedAt),
  };
});

const jobsWriteData = Object.values(JOBS).map((job) => {
  const correspondingCompanyId = JOB_COMPANY[job.jobId];
  const jobReviewIds = JOB_REVIEWS[job.jobId];

  if (!correspondingCompanyId || !jobReviewIds || jobReviewIds.length === 0) {
    console.error("wtf", job.jobId);
  }

  const currencies = new Set(
    jobReviewIds.map((id) => REVIEWS[id].reviewSalaryCurrency)
  );
  if (currencies.size > 1) {
    console.log(
      "job with multiple salaries detected uh oh",
      job.jobId,
      job.jobName,
      job.location,
      COMPANIES[correspondingCompanyId].companyName
    );
  }
  if (![...currencies][0]) {
    console.error("no currency for", job.jobid, job.jobName);
  }

  const jobReviewsWithSalary = jobReviewIds
    .map((id) => REVIEWS[id]?.reviewSalaryAmtHourly)
    .filter(hrlySalary => hrlySalary && hrlySalary >= 0);

  return {
    id: job.jobId,
    slug: job.jobSlug,
    name: job.jobName,
    location: job.location ?? null,
    companyId: correspondingCompanyId,
    reviewIds: jobReviewIds,
    reviewCount: jobReviewIds.length,
    scoreTotals: {
      overall: jobReviewIds.reduce(
        (acc, curReviewId) => acc + REVIEWS[curReviewId].overallScore,
        0
      ),
      learningMentorship: jobReviewIds.reduce(
        (acc, curReviewId) =>
          acc + REVIEWS[curReviewId].learningMentorshipScore,
        0
      ),
      meaningfulWork: jobReviewIds.reduce(
        (acc, curReviewId) => acc + REVIEWS[curReviewId].meaningfulWorkScore,
        0
      ),
      workLifeBalance: jobReviewIds.reduce(
        (acc, curReviewId) => acc + REVIEWS[curReviewId].workLifeBalanceScore,
        0
      ),
    },
    salaryMin: {
      amount:
        jobReviewsWithSalary.length > 0
          ? jobReviewsWithSalary.reduce(
              (acc, curHourlySalary) => Math.min(acc, curHourlySalary),
              Number.POSITIVE_INFINITY
            )
          : -1,
      currency: [...currencies][0],
      period: "hourly",
    },
    salaryMax: {
      amount:
        jobReviewsWithSalary.length > 0
          ? jobReviewsWithSalary.reduce(
              (acc, curHourlySalary) => Math.max(acc, curHourlySalary),
              Number.NEGATIVE_INFINITY
            )
          : -1,
      currency: [...currencies][0],
      period: "hourly",
    },
    createdAt: new Date(job.createdAt),
    updatedAt: new Date(job.updatedAt),
  };
});

const reviewsWriteData = Object.values(REVIEWS).map((review) => {
  const correspondingCompanyId = REVIEW_COMPANY[review.reviewId];
  const correspondingJobId = REVIEW_JOB[review.reviewId];

  if (!correspondingCompanyId || !correspondingJobId) {
    console.error("wtf", review.reviewId);
  }

  return {
    id: review.reviewId,
    body: review.reviewBody ?? null,
    tags: review.reviewTags ?? null,
    score: {
      overall: review.overallScore,
      learningMentorship: review.learningMentorshipScore,
      meaningfulWork: review.meaningfulWorkScore,
      workLifeBalance: review.workLifeBalanceScore,
    },
    salary: {
      amount: review.reviewSalaryAmt,
      period: review.reviewSalaryPeriod,
      currency: review.reviewSalaryCurrency,
    },
    salaryHourly: {
      amount: review.reviewSalaryAmtHourly,
      period: "hourly",
      currency: review.reviewSalaryCurrency,
    },
    author: {
      name: "An anonymous reviewer",
      id: null,
    },
    companyId: correspondingCompanyId,
    jobId: correspondingJobId,
    createdAt: new Date(review.reviewCreatedAt),
    updatedAt: new Date(review.reviewUpdatedAt),
    isLegacy: review.isLegacy ?? true,
    isApproved: true,
  };
});

const companiesFirebaseWriteData = companiesWriteData.map(
  ({ logo, jobIds, reviewIds, createdAt, updatedAt, ...rest }) => ({
    logoRef: logo,
    jobRefs: jobIds.map((id) => db.collection("jobs").doc(id)),
    reviewRefs: reviewIds.map((id) => db.collection("reviews").doc(id)),
    createdAt: firebase.firestore.Timestamp.fromDate(createdAt),
    updatedAt: firebase.firestore.Timestamp.fromDate(updatedAt),
    ...rest,
  })
);

const jobsFirebaseWriteData = jobsWriteData.map(
  ({ companyId, reviewIds, createdAt, updatedAt, ...rest }) => ({
    companyRef: db.collection("companies").doc(companyId),
    reviewRefs: reviewIds.map((id) => db.collection("reviews").doc(id)),
    createdAt: firebase.firestore.Timestamp.fromDate(createdAt),
    updatedAt: firebase.firestore.Timestamp.fromDate(updatedAt),
    ...rest,
  })
);

const reviewsFirebaseWriteData = reviewsWriteData.map(
  ({ companyId, jobId, createdAt, updatedAt, ...rest }) => ({
    companyRef: db.collection("companies").doc(companyId),
    jobRef: db.collection("jobs").doc(jobId),
    createdAt: firebase.firestore.Timestamp.fromDate(createdAt),
    updatedAt: firebase.firestore.Timestamp.fromDate(updatedAt),
    ...rest,
  })
);

console.log("dumping JSON...");

fs.writeFileSync(
  "./data.json",
  JSON.stringify({
    companies: companiesWriteData,
    jobs: jobsWriteData,
    reviews: reviewsWriteData,
  })
);

fs.writeFileSync("./orphaned-reviews.json", JSON.stringify(ORPHAN_REVIEWS));

console.log("done JSON dump.");

console.log("starting firebase sync...");

// companiesFirebaseWriteData.forEach(({ id, ...rest }) => {
//   db.collection("companies").doc(id).set(rest)
//   .then(() => {
//       console.log(`✅ Successfully wrote company ${id}`);
//   })
//   .catch((error) => {
//       console.error(`Error writing company ${id}: `, error);
//   });
// })

// jobsFirebaseWriteData.forEach(({ id, ...rest }) => {
//   db.collection("jobs")
//     .doc(id)
//     .set(rest)
//     .then(() => {
//       console.log(`✅ Successfully wrote job ${id}`);
//     })
//     .catch((error) => {
//       console.error(`Error writing job ${id}: `, error);
//     });
// });


// reviewsFirebaseWriteData.forEach(({ id, ...rest }) => {
//   db.collection("reviews").doc(id).set(rest)
//   .then(() => {
//       console.log(`✅ Successfully wrote review ${id}`);
//   })
//   .catch((error) => {
//       console.error(`Error writing review ${id}: `, error);
//   });
// })
