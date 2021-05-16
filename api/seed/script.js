const fs = require('fs')

const COMPANIES = {};
const JOBS = {};
const REVIEWS = {};

const COMPANY_JOBS = {};
const COMPANY_REVIEWS = {};
const JOB_REVIEWS = {};

fs.readFile('./data-companies', 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }

  data.split("\n").forEach(v => {
    const inside = v.match(/^\((.*)\)$/);
    try {
      const [companyId, createdAt, updatedAt, , companyName, companyDesc, companySlug] = inside[1].replace(/NULL/g, "''").split("',").map(v => {
        const stripped = v.replace(/'/g, '');
        return stripped === "''" || stripped === '' || !stripped ? null : stripped.replace(/\\/g, "'"); 
      }); 
      if(!companySlug) {
        console.log({companyId, createdAt, updatedAt, companyName, companyDesc, companySlug});
      }
      COMPANIES[companyId] = {companyId, createdAt, updatedAt, companyName, companyDesc, companySlug};
    } catch {
    }
  })
})

fs.readFile('./data-jobs', 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }

  data.split("\n").forEach(v => {
    const inside = v.match(/^\((.*)\)$/);
    try {
      let [jobId, createdAt, updatedAt, , jobSlug, jobName, , location] = inside[1].replace(/NULL/g, "''").split(",'").map(v => {
        const stripped = v.replace(/'/g, '');
        return stripped === "''" || stripped === '' || !stripped ? null : stripped.replace(/\\/g, "'"); 
      }); 
      updatedAt = updatedAt.split(',')[0];
      jobName = jobName.split(',')[0];

      if(!jobSlug) {
        console.log({jobId, createdAt, updatedAt, jobSlug, jobName, location});
      }

      JOBS[jobId] = {jobId, createdAt, updatedAt, jobSlug, jobName, location};
    } catch {
    }
  })
})

fs.readFile('./data-reviews', 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }

  data.split("\n").forEach(v => {
    const data = v.match(/^\('([a-zA-Z0-9]{25})','([0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}.[0-9]{6})','([0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}.[0-9]{6})',([0-9]+),('.*'|NULL),'(.*)',(-{0,1}[0-9]+),'(.*)','(monthly|weekly|hourly)',([0-9]\.[0-9]),([0-9]\.[0-9]),([0-9]\.[0-9]),([0-9]\.[0-9]),(?:'([a-zA-Z0-9]+(?:,[a-zA-Z0-9]+)*)'|(NULL)),(0|1),(0|1),(.*)\)$/);
    try {
      let [reviewId, createdAt, updatedAt, , jobSlug, jobName, , location] = inside[1].replace(/NULL/g, "''").split(",").map(v => {
        const stripped = v.replace(/'/g, '');
        return stripped === "''" || stripped === '' || !stripped ? null : stripped.replace(/\\/g, "'"); 
      }); 
      updatedAt = updatedAt.split(',')[0];
      jobName = jobName.split(',')[0];

      if(!jobSlug) {
        console.log({jobId, createdAt, updatedAt, jobSlug, jobName, location});
      }

      JOBS[jobId] = {jobId, createdAt, updatedAt, jobSlug, jobName, location};
    } catch {
    }

  })
})