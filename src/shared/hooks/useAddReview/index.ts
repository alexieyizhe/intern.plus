/**
 * Handles logic for tracking data for review creation, as well
 * as creating and updating the review on the backend.
 */
import { useState, useMemo } from "react";
import * as yup from "yup";
import { useMutation } from "@apollo/client";
import { ValueType } from "react-select/src/types";

import { slugify } from "src/shared/utils/misc";
import { addReviewBuilder } from "./graphql/queries";

const optionSchema = yup
  .object({
    label: yup.string(),
    value: yup.string(),
    __isNew__: yup.boolean().notRequired(),
  })
  .default(undefined);

const addReviewSchema = yup.object({
  company: optionSchema.nullable().required(),
  job: optionSchema.nullable().required(),
  location: yup.string().max(100).required(),
  body: yup.string().max(5000).required(),
  overallRating: yup.number().min(0).max(5).required(),
  meaningfulWorkRating: yup.number().min(0).max(5).required(),
  workLifeBalanceRating: yup.number().min(0).max(5).required(),
  learningMentorshipRating: yup.number().min(0).max(5).required(),
  salary: yup.number().when("noSalaryProvided", {
    is: true,
    then: yup.number().notRequired(),
    otherwise: yup.number().min(0).required(),
  }),
  salaryCurrency: optionSchema.when("noSalaryProvided", {
    is: true,
    then: optionSchema.notRequired(),
    otherwise: optionSchema.required(),
  }),
  salaryPeriod: yup
    .mixed<"hourly" | "weekly" | "monthly">()
    .when("noSalaryProvided", {
      is: true,
      then: yup.mixed().notRequired(),
      otherwise: yup
        .mixed<"hourly" | "weekly" | "monthly">()
        .oneOf(["hourly", "weekly", "monthly"]),
    }),
  noSalaryProvided: yup.boolean().notRequired(),
  tags: yup.array().of(optionSchema).nullable().notRequired(),
  authorEmail: yup.string().email().required(),
});

export type IAddReviewFields = yup.InferType<typeof addReviewSchema>;

export type IAddReviewState = {
  values: Partial<IAddReviewFields>;
  errors: {
    [key in keyof IAddReviewFields]: {
      error: boolean;
      text?: string;
    };
  };
};

const DEFAULT_REVIEW_STATE: IAddReviewState = {
  values: {},

  errors: {
    job: {
      error: false,
    },
    company: {
      error: false,
    },
    location: {
      error: false,
    },
    body: {
      error: false,
    },
    overallRating: {
      error: false,
    },
    meaningfulWorkRating: {
      error: false,
    },
    workLifeBalanceRating: {
      error: false,
    },
    learningMentorshipRating: {
      error: false,
    },
    salary: {
      error: false,
    },
    salaryCurrency: {
      error: false,
    },
    salaryPeriod: {
      error: false,
    },
    noSalaryProvided: {
      error: false,
    },
    tags: {
      error: false,
    },
    authorEmail: {
      error: false,
    },
  },
};

// export const useAddReview = () => {
//   const [reviewState, setReviewState] = useState(DEFAULT_REVIEW_STATE);

//   const onReviewChange = (
//     key: keyof IAddReviewFields,
//     value:
//       | string
//       | number
//       | boolean
//       | ValueType<{ label: string; value: string }>
//       | undefined
//   ) => {
//     setReviewState((prevState) => ({
//       ...prevState,
//       values: {
//         ...prevState.values,
//         [key]: value,
//         job:
//           key === "company"
//             ? null
//             : key === "job"
//             ? (value as IAddReviewFields["job"])
//             : prevState.values.job, // remove selected job if new company is selected since job corresponds to previous company
//       },
//     }));
//   };

//   const onReviewPotentialSubmit = () => {
//     try {
//       addReviewSchema.validateSync(reviewState.values, { abortEarly: false });

//       /**
//        * We've passed validation, reset errors to original state
//        */
//       setReviewState((prevState) => ({
//         ...prevState,
//         errors: DEFAULT_REVIEW_STATE.errors,
//       }));
//     } catch (e) {
//       if (e instanceof yup.ValidationError) {
//         setReviewState((prevState) => ({
//           ...prevState,
//           errors: {
//             ...DEFAULT_REVIEW_STATE.errors,
//             ...(e as yup.ValidationError).inner.reduce(
//               (acc, { path, message }) => ({
//                 ...acc,
//                 [path]: { error: true, text: message },
//               }),
//               {}
//             ),
//           },
//         }));
//         return false;
//       } else {
//         throw e;
//       }
//     }

//     return true;
//   };

//   /**
//    * Build add-review query
//    */
//   const ADD_REVIEW_QUERY = useMemo(
//     () =>
//       addReviewBuilder(
//         !!reviewState.values.company?.__isNew__,
//         !!reviewState.values.job?.__isNew__
//       ),
//     [reviewState.values.company, reviewState.values.job]
//   );
//   const [addReview] = useMutation(ADD_REVIEW_QUERY);

//   /**
//    * Interpret the review state into values that can be
//    * used in the query/mutation.
//    */
//   const queryVariables = useMemo(() => {
//     const isNewCompany = reviewState.values.company?.__isNew__;
//     const isNewJob = reviewState.values.job?.__isNew__;

//     return {
//       ...reviewState.values,
//       companyName: reviewState.values.company?.label,
//       companySlug: isNewCompany
//         ? slugify(reviewState.values.company?.value || "")
//         : reviewState.values.company?.value,
//       jobId: reviewState.values.job?.value,
//       jobName: reviewState.values.job?.label,
//       jobSlug: isNewJob
//         ? slugify(reviewState.values.job?.value || "")
//         : reviewState.values.job?.value,
//       salary: reviewState.values.noSalaryProvided
//         ? -1
//         : reviewState.values.salary,
//       salaryCurrency: reviewState.values.salaryCurrency?.value,
//       tags: reviewState.values.tags?.map((option) => option.value).join(","),
//     };
//   }, [reviewState.values]);

//   const onReviewSubmit = async () => {
//     /**
//      * Execute the mutation
//      */
//     const { errors } = await addReview({
//       variables: queryVariables,
//     });

//     if (!errors) {
//       // review add successful, reset
//       setReviewState(DEFAULT_REVIEW_STATE);
//       return true;
//     } else {
//       return false;
//     }
//   };

//   return {
//     reviewState,
//     onReviewChange,
//     onReviewPotentialSubmit,
//     onReviewSubmit,
//   };
// };
