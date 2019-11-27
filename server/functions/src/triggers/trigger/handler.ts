/**
 * This file was generated using 8base CLI.
 *
 * To learn more about writing custom trigger functions, visit
 * the 8base documentation at:
 *
 * https://docs.8base.com/8base-console/custom-functions/triggers
 *
 * To update this functions invocation settings, update its configuration block
 * in the projects 8base.yml file:
 *  functions:
 *    trigger:
 *      ...
 *
 * Data that is sent to the function can be accessed on the event argument at:
 *  event.data[KEY_NAME]
 *
 * To invoke this function locally, run:
 *  8base invoke-local trigger -p src/triggers/trigger/mocks/request.json
 */

type TriggerResult = {
  data: {
    result: string;
  };
  errors: Array<object>;
};

const GET_COMPANY = `
  query GetCompany($id: ID) {
    company(id: $id) {
      numRatings
      totRating
      avgRating
      totLearningMentorshipRating
      avgLearningMentorshipRating
      totMeaningfulWorkRating
      avgMeaningfulWorkRating
      totWorkLifeBalanceRating
      avgWorkLifeBalanceRating
      totHourlySalary
      avgHourlySalary
      minHourlySalary
      maxHourlySalary
    }
  }
`;
const GET_JOB = `
  query GetJob($id: ID) {
    job(id: $id) {
      numRatings
      totRating
      avgRating
      totLearningMentorshipRating
      avgLearningMentorshipRating
      totMeaningfulWorkRating
      avgMeaningfulWorkRating
      totWorkLifeBalanceRating
      avgWorkLifeBalanceRating
      totHourlySalary
      avgHourlySalary
      minHourlySalary
      maxHourlySalary
    }
  }
`;

const UPDATE_COMPANY = `
  mutation UpdateCompany(
    $id: ID
    $numRatings: Int
    $totRating: Float!
    $avgRating: Float!
    $totLearningMentorshipRating: Float!
    $avgLearningMentorshipRating: Float!
    $totMeaningfulWorkRating: Float!
    $avgMeaningfulWorkRating: Float!
    $totWorkLifeBalanceRating: Float!
    $avgWorkLifeBalanceRating: Float!
    $totHourlySalary: Int
    $avgHourlySalary: Int
    $minHourlySalary: Int
    $maxHourlySalary: Int
  ) {
    companyUpdate(data: {
      id: $id
      numRatings: $numRatings
      totRating: $totRating
      avgRating: $avgRating
      totLearningMentorshipRating: $totLearningMentorshipRating
      avgLearningMentorshipRating: $avgLearningMentorshipRating
      totMeaningfulWorkRating: $totMeaningfulWorkRating
      avgMeaningfulWorkRating: $avgMeaningfulWorkRating
      totWorkLifeBalanceRating: $totWorkLifeBalanceRating
      avgWorkLifeBalanceRating: $avgWorkLifeBalanceRating
      totHourlySalary: $totHourlySalary
      avgHourlySalary: $avgHourlySalary
      minHourlySalary: $minHourlySalary
      maxHourlySalary: $maxHourlySalary
    }) {
      id
    }
  }
`;

const UPDATE_JOB = `
  mutation UpdateJob(
    $id: ID
    $numRatings: Int
    $totRating: Float!
    $avgRating: Float!
    $totLearningMentorshipRating: Float!
    $avgLearningMentorshipRating: Float!
    $totMeaningfulWorkRating: Float!
    $avgMeaningfulWorkRating: Float!
    $totWorkLifeBalanceRating: Float!
    $avgWorkLifeBalanceRating: Float!
    $totHourlySalary: Int
    $avgHourlySalary: Int
    $minHourlySalary: Int
    $maxHourlySalary: Int
  ) {
    jobUpdate(data: {
      id: $id
      numRatings: $numRatings
      totRating: $totRating
      avgRating: $avgRating
      totLearningMentorshipRating: $totLearningMentorshipRating
      avgLearningMentorshipRating: $avgLearningMentorshipRating
      totMeaningfulWorkRating: $totMeaningfulWorkRating
      avgMeaningfulWorkRating: $avgMeaningfulWorkRating
      totWorkLifeBalanceRating: $totWorkLifeBalanceRating
      avgWorkLifeBalanceRating: $avgWorkLifeBalanceRating
      totHourlySalary: $totHourlySalary
      avgHourlySalary: $avgHourlySalary
      minHourlySalary: $minHourlySalary
      maxHourlySalary: $maxHourlySalary
    }) {
      id
    }
  }
`;

export default async (event: any, ctx: any): Promise<TriggerResult> => {
  const { isVerified: wasVerifiedBefore } = event.originalObject;
  const { isVerified: isVerifiedAfter, isSpam } = event.data;
  const {
    overallRating: overallRatingStr,
    learningMentorshipRating: learningMentorshipRatingStr,
    meaningfulWorkRating: meaningfulWorkRatingStr,
    workLifeBalanceRating: workLifeBalanceRatingStr,
    salary: salaryStr,
    salaryPeriod,
  } = event.data;
  const overallRating = parseFloat(overallRatingStr);
  const learningMentorshipRating = parseFloat(learningMentorshipRatingStr);
  const meaningfulWorkRating = parseFloat(meaningfulWorkRatingStr);
  const workLifeBalanceRating = parseFloat(workLifeBalanceRatingStr);
  const salary = parseFloat(salaryStr);
  const noSalaryDisclosed = salary === -1;
  let hourlySalary = salary;
  if (salaryPeriod === "weekly") {
    hourlySalary = Math.round(salary / 40);
  } else if (salaryPeriod === "monthly") {
    hourlySalary = Math.round(salary / 160);
  }

  if (
    wasVerifiedBefore === false &&
    isVerifiedAfter === true &&
    isSpam === false
  ) {
    console.log("------------------------- Verified -------------------------");

    // console.log({
    //   overallRatingStr,
    //   learningMentorshipRatingStr,
    //   meaningfulWorkRatingStr,
    //   workLifeBalanceRatingStr,
    //   salaryStr,
    // });
    // console.log({
    //   overallRating,
    //   learningMentorshipRating,
    //   meaningfulWorkRating,
    //   workLifeBalanceRating,
    //   salary,
    //   salaryPeriod,
    // });

    // console.log(
    //   "company id is",
    //   event.originalData.company.reconnect.id,
    //   "job id is",
    //   event.originalData.job.reconnect.id
    // );

    const { company } = await ctx.api.gqlRequest(GET_COMPANY, {
      id: event.originalData.company.reconnect.id,
    });
    // console.log("company info is", company);

    const newCompanyData = {
      numRatings: company.numRatings + 1,
      totRating: company.totRating + overallRating,
      avgRating: (company.totRating + overallRating) / (company.numRatings + 1),
      totLearningMentorshipRating:
        company.totLearningMentorshipRating + learningMentorshipRating,
      avgLearningMentorshipRating:
        (company.totLearningMentorshipRating + learningMentorshipRating) /
        (company.numRatings + 1),
      totMeaningfulWorkRating:
        company.totMeaningfulWorkRating + meaningfulWorkRating,
      avgMeaningfulWorkRating:
        (company.totMeaningfulWorkRating + meaningfulWorkRating) /
        (company.numRatings + 1),
      totWorkLifeBalanceRating:
        company.totWorkLifeBalanceRating + workLifeBalanceRating,
      avgWorkLifeBalanceRating:
        (company.totWorkLifeBalanceRating + workLifeBalanceRating) /
        (company.numRatings + 1),
      totHourlySalary: noSalaryDisclosed
        ? company.totHourlySalary
        : company.totHourlySalary + hourlySalary,
      avgHourlySalary: noSalaryDisclosed
        ? company.avgHourlySalary
        : Math.round(
            (company.totHourlySalary + hourlySalary) / (company.numRatings + 1)
          ),
      minHourlySalary: noSalaryDisclosed
        ? company.minHourlySalary
        : company.minHourlySalary === -1
        ? hourlySalary
        : Math.min(company.minHourlySalary, hourlySalary),
      maxHourlySalary: noSalaryDisclosed
        ? company.maxHourlySalary
        : company.maxHourlySalary === -1
        ? hourlySalary
        : Math.max(company.maxHourlySalary, hourlySalary),
    };

    const { job } = await ctx.api.gqlRequest(GET_JOB, {
      id: event.originalData.job.reconnect.id,
    });
    // console.log("job info is", job);

    const newJobData = {
      numRatings: job.numRatings + 1,
      totRating: job.totRating + overallRating,
      avgRating: (job.totRating + overallRating) / (job.numRatings + 1),
      totLearningMentorshipRating:
        job.totLearningMentorshipRating + learningMentorshipRating,
      avgLearningMentorshipRating:
        (job.totLearningMentorshipRating + learningMentorshipRating) /
        (job.numRatings + 1),
      totMeaningfulWorkRating:
        job.totMeaningfulWorkRating + meaningfulWorkRating,
      avgMeaningfulWorkRating:
        (job.totMeaningfulWorkRating + meaningfulWorkRating) /
        (job.numRatings + 1),
      totWorkLifeBalanceRating:
        job.totWorkLifeBalanceRating + workLifeBalanceRating,
      avgWorkLifeBalanceRating:
        (job.totWorkLifeBalanceRating + workLifeBalanceRating) /
        (job.numRatings + 1),
      totHourlySalary: noSalaryDisclosed
        ? job.totHourlySalary
        : job.totHourlySalary + hourlySalary,
      avgHourlySalary: noSalaryDisclosed
        ? job.avgHourlySalary
        : Math.round(
            (job.totHourlySalary + hourlySalary) / (job.numRatings + 1)
          ),
      minHourlySalary: noSalaryDisclosed
        ? job.minHourlySalary
        : job.minHourlySalary === -1
        ? hourlySalary
        : Math.min(job.minHourlySalary, hourlySalary),
      maxHourlySalary: noSalaryDisclosed
        ? job.maxHourlySalary
        : job.maxHourlySalary === -1
        ? hourlySalary
        : Math.max(job.maxHourlySalary, hourlySalary),
    };

    // console.log("new company info is", newCompanyData);
    // console.log("new job info is", newJobData);

    const { id: companyId } = await ctx.api.gqlRequest(UPDATE_COMPANY, {
      id: event.originalData.company.reconnect.id,
      ...newCompanyData,
    });

    const { id: jobId } = await ctx.api.gqlRequest(UPDATE_JOB, {
      id: event.originalData.job.reconnect.id,
      ...newJobData,
    });
    console.log(`Successfully updated company ${companyId} and job ${jobId}`);

    console.log("------------------------- Finished -------------------------");
  }

  /**
   * TODO: reverse everything if accidentally verified a review we
   * don't want to verify yet.
   */
  if (wasVerifiedBefore === true && isVerifiedAfter === false) {
    console.log("reversing verification");
  }

  return {
    data: event.data,
    /**
     * Triggers allow for errors to be specified in the response
     * as an array of user defined objects.
     *
     * Example:
     *
     * [{
     *  message: "Error message",
     *  code: "error_code"
     * }, ...]
     */
    errors: [],
  };
};
