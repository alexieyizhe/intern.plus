const { Parser } = require("json2csv"); // eslint-disable-line
const fs = require("fs"); // eslint-disable-line

const companyJSON = require("./company.json"); // eslint-disable-line

const fields = [
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

const json2csvParser = new Parser({ fields });
const csv = json2csvParser.parse(companyJSON);

fs.writeFile("./migration/company.csv", csv, () => {});

console.log("done");
