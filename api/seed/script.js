const fs = require('fs')

const noContents = (v) => v === '' || !v;

const COMPANIES = {};
const JOBS = {};
const REVIEWS = {};

const companiesData = fs.readFileSync('./data-companies', 'utf8');
const jobsData = fs.readFileSync('./data-jobs', 'utf8');
const reviewsData = fs.readFileSync('./data-reviews', 'utf8');

companiesData.split("\n").forEach(v => {
  const inside = v.match(/^\((.*)\)$/);
  try {
    const [companyId, createdAt, updatedAt, , companyName, companyDesc, companySlug] = inside[1].replace(/NULL/g, "''").split("',").map(v => {
      const stripped = v.replace(/'/g, '');
      return stripped === "''" || stripped === '' || !stripped ? null : stripped.replace(/\\/g, "'"); 
    }); 
    if(noContents(companyId) || noContents(createdAt) || noContents(updatedAt) || noContents(companyName) || noContents(companySlug)) {
      console.error({companyId, createdAt, updatedAt, companyName, companyDesc, companySlug});
    }
    COMPANIES[companyId] = {companyId, createdAt, updatedAt, companyName, companyDesc, companySlug};
  } catch(e) {
    console.error(e, v);
  }
})

jobsData.split("\n").forEach(v => {
  const inside = v.match(/^\((.*)\)$/);
  try {
    let [jobId, createdAt, updatedAt, , jobSlug, jobName, , location] = inside[1].replace(/NULL/g, "''").split(",'").map(v => {
      const stripped = v.replace(/'/g, '');
      return stripped === "''" || stripped === '' || !stripped ? null : stripped.replace(/\\/g, "'"); 
    }); 
    updatedAt = updatedAt.split(',')[0];
    jobName = jobName.split(',')[0];

    if(noContents(jobSlug) || noContents(jobId) || noContents(createdAt) || noContents(updatedAt) || noContents(jobName) || noContents(location)) {
      console.error({jobId, createdAt, updatedAt, jobSlug, jobName, location});
    }

    JOBS[jobId] = {jobId, createdAt, updatedAt, jobSlug, jobName, location};
  } catch(e) {
    console.error(e, v);
  }
})

const reviewsRegex = /^\('([a-zA-Z0-9]{25})','([0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}.[0-9]{6})','([0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}.[0-9]{6})',([0-9]+),(?:'(.*)'|(NULL)),'(.*)',(-{0,1}[0-9]+),'(.*)','(monthly|weekly|hourly)',([0-9]\.[0-9]),(?:([0-9]\.[0-9])|(NULL)),(?:([0-9]\.[0-9])|(NULL)),(?:([0-9]\.[0-9])|(NULL)),(?:'([a-zA-Z0-9-_ ]*(?:,[a-zA-Z0-9-_ ]+)*)'|(NULL)),(0|1),(0|1),(.*)\)$/;

reviewsData.split("\n").forEach(v => {
  try {
    const matches = reviewsRegex.exec(v);
    const [original, reviewId, reviewCreatedAt, reviewUpdatedAt, reviewDeletedAt, , , reviewBody, reviewSalaryAmt, reviewSalaryCurrency, reviewSalaryPeriod, overallRating, learningMentorshipRating, , meaningfulWorkRating, , workLifeBalanceRating, , reviewTags, , isSpam, isLegacy, rest] = matches;
    if(noContents(reviewId) || noContents(reviewCreatedAt) || noContents(reviewUpdatedAt) || noContents(reviewBody) || noContents(reviewSalaryAmt) || noContents(reviewSalaryCurrency) || noContents(reviewSalaryPeriod) || noContents(overallRating) || noContents(isSpam) || noContents(isLegacy) || reviewSalaryCurrency.length !== 3) {
      console.log({original, reviewId, reviewCreatedAt, reviewUpdatedAt, reviewDeletedAt, reviewBody, reviewSalaryAmt, reviewSalaryCurrency, reviewSalaryPeriod, overallRating, learningMentorshipRating, meaningfulWorkRating, workLifeBalanceRating, reviewTags, isSpam, isLegacy, rest});
    }

    REVIEWS[reviewId] = {original, reviewId, reviewCreatedAt, reviewUpdatedAt, reviewDeletedAt, reviewBody: reviewBody.replaceAll("\\'", "'").replaceAll('\\"', '"').replaceAll("\\n", "\n"), reviewSalaryAmt, reviewSalaryCurrency, reviewSalaryPeriod, overallRating, learningMentorshipRating, meaningfulWorkRating, workLifeBalanceRating, reviewTags, isSpam, isLegacy, rest};

  } catch(e) {
    console.error(e, v);
  }
})


const REVIEW_TO_JOB = {};
const JOB_TO_COMPANY = {};

const reviewsToJobsData = fs.readFileSync('./data-join-jobs-reviews', 'utf8');
const jobsToCompaniesData = fs.readFileSync('./data-join-companies-jobs', 'utf8');

const joinMatchRegex = /\('([a-zA-Z0-9]{25})','([a-zA-Z0-9]{25})','.{55}'\)/g;
const rtjMatches = [...reviewsToJobsData.matchAll(joinMatchRegex)];
rtjMatches.forEach(match => {
  const [originalRtj, reviewId, correspondingJobId] = match;

  const review = REVIEWS[reviewId];
  const correspondingJob = JOBS[correspondingJobId];

  if(!review || !correspondingJob) {
    console.error("No match for review", reviewId, "to job", correspondingJobId);
  }
})

const jtcMatches = [...jobsToCompaniesData.matchAll(joinMatchRegex)];
jtcMatches.forEach(match => {
  const [originalJtc, jobId, correspondingCompanyId] = match;

  const job = JOBS[jobId];
  const correspondingCompany = COMPANIES[correspondingCompanyId];

  if(!job || !correspondingCompany) {
    console.error("No match for job", jobId, "to company", correspondingCompanyId);
  }
})



// build review-job lookup
// build job-company lookup
// iterate reviews, add to jobs
// iterate jobs, add to company


console.log(Object.keys(COMPANIES).length)
console.log(Object.keys(JOBS).length)
console.log(Object.keys(REVIEWS).length)
