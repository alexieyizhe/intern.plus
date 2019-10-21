export interface ICompanyDetails {
  name: string;
  desc?: string;
  numRatings: number;
  avgRating: number;
  logoSrc: string;
  color: string;
}

export interface IJobDetails {
  name: string;
  companyName: string;
  companySlug: string;
  location?: string;
  numRatings: number;
  avgRating: number;
  avgLearningMentorshipRating: number;
  avgMeaningfulWorkRating: number;
  avgWorkLifeBalanceRating: number;
  minHourlySalary: number;
  maxHourlySalary: number;
  hourlySalaryCurrency: string;
  color: string;
}

export interface IReviewDetails {
  jobName: string;
  jobId: string;
  companyName: string;
  companySlug: string;
  location?: string;
  author: string;
  body: string;
  overallRating: number;
  meaningfulWorkRating: number;
  workLifeBalanceRating: number;
  learningMentorshipRating: number;
  salary: number;
  salaryCurrency: string;
  salaryPeriod: string;
  logoSrc: string;
  color: string;
}
