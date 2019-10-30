import { slugify } from "src/shared/utils/misc";
import faker from "faker";

import { CompanyResult } from "../types/CompanyResult";

export const getMockCompanyResult = (): CompanyResult => {
  const companyName = faker.company.companyName();
  const companySlug = slugify(companyName);
  const companyImgUrl = `https://picsum.photos/seed/${faker.random.number({
    min: 1,
    max: 500,
  })}/256`;

  return {
    __typename: "Company",
    name: companyName,
    slug: companySlug,
    desc: faker.company.catchPhrase(),
    logoImg: {
      __typename: "File",
      downloadUrl: companyImgUrl,
    },
    logoColor: "",
    avgRating: faker.random.number({ min: 1, max: 5 }),
    reviews: {
      __typename: "ReviewListResponse",
      count: faker.random.number({ min: 3, max: 1240 }),
    },
  };
};
