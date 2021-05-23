/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum SalaryPeriod {
  HOURLY = "HOURLY",
  MONTHLY = "MONTHLY",
  WEEKLY = "WEEKLY",
  YEARLY = "YEARLY",
}

export interface CompanySearchInput {
  query?: string | null;
  sort?: string | null;
  filterOverallRatingGt?: number | null;
  filterOverallRatingLt?: number | null;
}

export interface JobSearchInput {
  query?: string | null;
  sort?: string | null;
  filterOverallRatingGt?: number | null;
  filterOverallRatingLt?: number | null;
  filterSalaryHourlyAmountGt?: number | null;
  filterSalaryHourlyAmountLt?: number | null;
}

export interface ReviewSearchInput {
  query?: string | null;
  sort?: string | null;
  filterOverallRatingGt?: number | null;
  filterOverallRatingLt?: number | null;
  filterSalaryAmountGt?: number | null;
  filterSalaryAmountLt?: number | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
declare global { type InternPlusISODate = string; }
