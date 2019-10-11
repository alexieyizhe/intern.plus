import { ApolloServer, gql } from "apollo-server-lambda";

/**
 * **[BEGIN] TEST DATA**
 */
enum PayPeriod {
  HOURLY,
  MONTHLY,
}

enum Currency {
  USD,
  CAD,
  EUR,
  OTHER,
}

interface Company {
  id: string;
  name: string;
  desc?: string;
  slug: string;
  reviews: Review[];
  numReviews: number;
  totalReviewScore: number;
  avgReviewScore: number;
}

interface Job {
  id: string;
  title: string;
  company: Company;
  minSalary: number; // in cents
  maxSalary: number; // in cents
  avgSalary: number; // in cents
  reviews: Review[];
  numReviews: number;
  totalReviewScore: number;
  avgReviewScore: number;
}

interface Review {
  id: string;
  company: Company;
  job: Job;
  location?: string;
  desc: string;
  salary: number; // in cents
  payPeriod: PayPeriod;
  payCurrency: Currency;
  overallScore: number;
  mentorshipScore?: number;
  workLifeBalanceScore?: number;
  meaningfulWorkScore?: number;
  createdAt: string;
}

const testCompanies: Company[] = [
  {
    id: "1",
    name: "Google",
    desc:
      "Google is a multinational corporation that is specialized in internet-related services and products.",
    slug: "google",
    reviews: [],
    numReviews: 2,
    totalReviewScore: 8,
    avgReviewScore: 4,
  },
  {
    id: "2",
    name: "Snapchat",
    desc:
      "Snapchat is a photo messaging app that allows users to take photos, record videos, add text and drawings, and send them to recipients.",
    slug: "snapchat",
    reviews: [],
    numReviews: 1,
    totalReviewScore: 3,
    avgReviewScore: 3,
  },
  {
    id: "3",
    name: "Shopify",
    desc:
      "Shopify is the leading cloud-based, multichannel commerce platform designed for small and medium-sized businesses.",
    slug: "shopify",
    reviews: [],
    numReviews: 1,
    totalReviewScore: 5,
    avgReviewScore: 5,
  },
];

const testJobs: Job[] = [
  {
    id: "1",
    title: "Software Engineer Intern",
    company: testCompanies[0],
    minSalary: 140000, // in cents
    maxSalary: 150000, // in cents
    avgSalary: 145000, // in cents
    reviews: [],
    numReviews: 2,
    totalReviewScore: 8,
    avgReviewScore: 4,
  },
  {
    id: "2",
    title: "Software Engineer in Test - Co-op",
    company: testCompanies[1],
    minSalary: 2000000, // in cents
    maxSalary: 2000000, // in cents
    avgSalary: 2000000, // in cents
    reviews: [],
    numReviews: 1,
    totalReviewScore: 3,
    avgReviewScore: 3,
  },
  {
    id: "3",
    title: "UX Developer Intern",
    company: testCompanies[2],
    minSalary: 150000, // in cents
    maxSalary: 150000, // in cents
    avgSalary: 150000, // in cents
    reviews: [],
    numReviews: 1,
    totalReviewScore: 5,
    avgReviewScore: 5,
  },
];

const testReviews: Review[] = [
  {
    id: "1",
    company: testCompanies[0],
    job: testJobs[0],
    location: "Mountain View, California",
    desc:
      "A quickly changing company going through a lot of growth. When I was interning, teams were still being figured out, but working at such a company will provide a neat learning experience. Would recommend at least one internship in this kind of environment. People at Google were super friendly, and the work that they were doing was interesting and is becoming more interesting term after term as they face new challenges.",
    salary: 140000, // in cents
    payPeriod: PayPeriod.HOURLY,
    payCurrency: Currency.USD,
    overallScore: 5,
    mentorshipScore: 5,
    workLifeBalanceScore: 5,
    meaningfulWorkScore: 5,
    createdAt: "2017-01-25T19:21:57.310Z",
  },
  {
    id: "2",
    company: testCompanies[0],
    job: testJobs[0],
    location: "Waterloo, Ontario",
    desc:
      "Worked there May-August 2018. Unique opportunity to have both autonomy and valuable guidance. Youtube gives interns access to industry experts who are open and willing to helping you succeed in your project. We were able to reach out to senior Google leaders to receive feedback and mentorship as well as had the chance to grow our own ideas and thoughts.",
    salary: 150000, // in cents
    payPeriod: PayPeriod.HOURLY,
    payCurrency: Currency.CAD,
    overallScore: 3,
    mentorshipScore: 3,
    workLifeBalanceScore: 4,
    meaningfulWorkScore: 4,
    createdAt: "2017-01-28T22:05:46.728Z",
  },
  {
    id: "3",
    company: testCompanies[1],
    job: testJobs[1],
    location: "Tokyo, Japan",
    desc:
      "Snapchat is a great work environment. People are nice, free meals and sushi every day is nice. QA is fine, it's just testing the app for bugs, unfortunately that can only get so interesting. The QA full-times are super nice and helpful. You'll learn a bit about the mobile development cycle. They will encourage you to talk to others in the company if you are working on a side project, or if you want to return in a different role. I had lots of time outside work to work on passion projects. All in all, they're used to having lots of co-ops, so it was as comfortable as it could have been. Your experience is what you make of it!",
    salary: 2000000, // in cents
    payPeriod: PayPeriod.HOURLY,
    payCurrency: Currency.OTHER,
    overallScore: 3,
    mentorshipScore: 3,
    workLifeBalanceScore: 2,
    meaningfulWorkScore: 5,
    createdAt: "2019-10-28T22:05:46.728Z",
  },
  {
    id: "4",
    company: testCompanies[2],
    job: testJobs[2],
    location: "Ottawa, Ontario",
    desc:
      "Free breakfast is pastries and fruit. Free lunch is catered by local restaurants, and is usually really good. The company is really good at accommodating dietary preferences and allergies, too. The company subsidizes housing for interns - I believe they pay 50% of your rent if you're working in Ottawa, not sure if the situation is the same elsewhere.\n\nI'm only three weeks in, but really enjoying it so far. Cool problems to work on. Great coworkers and a supportive team. All interns did a three-day onboarding in Ottawa, and spent another three nights in Ottawa for the annual corporate summit (usually scheduled in January, I gather). Plenty of free clothing, if that interests you. Shopify is growing really fast, too - it seems like a great company to transition into a full-time role at.",
    salary: 150000, // in cents
    payPeriod: PayPeriod.HOURLY,
    payCurrency: Currency.CAD,
    overallScore: 5,
    mentorshipScore: 5,
    workLifeBalanceScore: 5,
    meaningfulWorkScore: 5,
    createdAt: "2018-02-16T15:05:46.728Z",
  },
];

/**
 * **[END] TEST DATA**
 */

const typeDefs = gql`
  enum PayPeriod {
    HOURLY
    MONTHLY
  }

  enum Currency {
    USD
    CAD
    EUR
    OTHER
  }

  type Company {
    id: ID!
    name: String!
    desc: String
    slug: String!
    reviews: [Review!]!
    numReviews: Int!
    totalReviewScore: Int!
    avgReviewScore: Float!
  }

  type Job {
    id: ID!
    title: String!
    company: Company!
    minSalary: Int!
    maxSalary: Int!
    avgSalary: Int!
    reviews: [Review!]!
    numReviews: Int!
    totalReviewScore: Int!
    avgReviewScore: Float!
  }

  type Review {
    id: ID!
    company: Company!
    job: Job!
    location: String
    desc: String!
    salary: Int!
    payPeriod: PayPeriod!
    payCurrency: Currency!
    overallScore: Int!
    mentorshipScore: Int
    workLifeBalanceScore: Int
    meaningfulWorkScore: Int
    createdAt: String!
  }

  type Query {
    ping: String
    companies: [Company!]!
    jobs: [Job!]!
    reviews: [Review!]!
  }
`;

const resolvers = {
  Query: {
    ping: () => "Hello, world!",

    companies: () => testCompanies,
    jobs: () => testJobs,
    reviews: () => testReviews,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
});

exports.handler = server.createHandler();
