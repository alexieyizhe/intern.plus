const { Parser } = require("json2csv"); // eslint-disable-line
const fs = require("fs"); // eslint-disable-line

const COMPANY_KEY = "company";
const JOB_KEY = "job";
const REVIEW_KEY = "review";

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

const jobFields = []; // TODO: migrate jobs

const reviewFields = []; // TODO: migrate reviews

const dict = {
  "-c": {
    fields: companyFields,
    key: COMPANY_KEY,
  },
  "-j": {
    fields: jobFields,
    key: JOB_KEY,
  },
  "-r": {
    fields: reviewFields,
    key: REVIEW_KEY,
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
const jsonInput = require(`./${dictEntry.key}.json`); // eslint-disable-line

console.log("Parsing...");
const csvOutput = json2csvParser.parse(jsonInput);

console.log("Writing to output...");
fs.writeFile(`./migration/${dictEntry.key}.csv`, csvOutput, () => {});

console.log("Done migration!");
