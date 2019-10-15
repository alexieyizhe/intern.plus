// export interface ICompanyResult {
//   slug: string; // unique slug for company
//   name: string;
//   desc: string;
//   logoSrc: string;
//   avgRating: number; // score out of 5
//   numRatings: number;
//   color: string;
// }

// export interface IJobResult {
//   id: string;
//   role: string;
//   location: string;
//   avgRating: number; // score out of 5
//   numRatings: number;
//   minHourlySalary: number; // hourly
//   maxHourlySalary: number; // hourly
//   salaryCurrency: string; // hourly
//   color: string;
// }

// export interface IReviewJobResult {
//   id: string;
//   companyName: string; // company name
//   jobName: string; // role/position
//   rating: number; // score out of 5
//   contents: string;
//   color: string;
// }

// export interface IReviewUserResult {
//   id: string;
//   authorName: string; // name of the reviewer (or Anonymous)
//   date: string; // date of the review
//   rating: number;
//   contents: string;
//   color: string;
// }

// export type Result =
//   | IReviewJobResult
//   | IReviewUserResult
//   | ICompanyResult
//   | IJobResult;

// export const resultIsCompany = (result: Result): result is ICompanyResult =>
//   "slug" in result && "avgRating" in result;

// export const resultIsJob = (result: Result): result is IJobResult =>
//   "location" in result && "salaryCurrency" in result;

// export const resultIsReviewJob = (result: Result): result is IReviewJobResult =>
//   "contents" in result && "companyName" in result;

// export const resultIsReviewUser = (
//   result: Result
// ): result is IReviewUserResult =>
//   "contents" in result && "authorName" in result;

// /**
//  * Creates a friendly list of review results from fetched data.
//  * This is used for displaying reviews for a given job
//  * @param itemList list of review items
//  */

// export const buildCompanyItem = (item: TYPE_HERE): ICompanyResult => ({
//   slug: item.slug || "",
//   companyName: item.company.name || "",
//   jobName: item.job.name || "",
//   rating: item.overallScore || 0,
//   contents: item.body || "",
//   color: "#FFEBEE",
// });

// export const buildJobItem = (item: TYPE_HERE): IJobResult => ({
//   id: item.id || "",
//   companyName: item.company.name || "",
//   jobName: item.job.name || "",
//   rating: item.overallScore || 0,
//   contents: item.body || "",
//   color: "#FFEBEE",
// });

// export const buildReviewUserItem = (item: TYPE_HERE): IReviewJobResult => ({
//   id: item.id || "",
//   companyName: item.company.name || "",
//   jobName: item.job.name || "",
//   rating: item.overallScore || 0,
//   contents: item.body || "",
//   color: "#FFEBEE",
// });

// export const buildReviewJobItem = (item: TYPE_HERE): IReviewUserResult => ({
//   id: item.id || "",
//   authorName: item.author || "",
//   date: (item.createdAt || item.updatedAt || "").toString(),
//   rating: item.overallScore || 0,
//   contents: item.body || "",
//   color: "#FFEBEE",
// });

// export const buildCompanyItemList = (itemList: TYPE_HERE[]): ICompanyResult[] =>
//   itemList.map(buildCompanyItem);

// export const buildJobItemList = (itemList: TYPE_HERE[]): IJobResult[] =>
//   itemList.map(buildJobItem);

// export const buildReviewUserItemList = (
//   itemList: TYPE_HERE[]
// ): IReviewUserResult[] => itemList.map(buildReviewUserItem);

// export const buildReviewJobItemList = (
//   itemList: TYPE_HERE[]
// ): IReviewJobResult[] => itemList.map(buildReviewJobItem);

// export const buildItemList = (itemList: TYPE_HERE[]): Result =>
//   itemList.map(item => {
//     if (resultIsCompany(item)) {
//       return buildCompanyItem(item);
//     }
//   });
