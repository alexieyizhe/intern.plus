import { useState } from "react";
import * as yup from "yup";

const optionSchema = yup
  .object({
    label: yup.string(),
    value: yup.string(),
  })
  .default(undefined);

const addReviewSchema = yup.object({
  company: optionSchema.required(),
  job: optionSchema.required(),
  location: optionSchema.notRequired(),
  body: yup.string().notRequired(),
  overallRating: yup
    .number()
    .min(0)
    .max(5)
    .required(),
  meaningfulWorkRating: yup
    .number()
    .min(0)
    .max(5)
    .required(),
  workLifeBalanceRating: yup
    .number()
    .min(0)
    .max(5)
    .required(),
  learningMentorshipRating: yup
    .number()
    .min(0)
    .max(5)
    .required(),
  salary: yup
    .number()
    .min(0)
    .required(),
  salaryCurrency: optionSchema.required(),
  salaryPeriod: yup
    .mixed<"hourly" | "weekly" | "monthly">()
    .oneOf(["hourly", "weekly", "monthly"]),
  tags: yup
    .array()
    .of(optionSchema)
    .notRequired(),
  authorEmail: yup
    .string()
    .email()
    .required(),
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
  values: {
    job: undefined,
    company: undefined,
    location: undefined,
    body: "",
    overallRating: undefined,
    meaningfulWorkRating: undefined,
    workLifeBalanceRating: undefined,
    learningMentorshipRating: undefined,
    salary: undefined,
    salaryCurrency: undefined,
    salaryPeriod: undefined,
    tags: [],
    authorEmail: "",
  },

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
    tags: {
      error: false,
    },
    authorEmail: {
      error: false,
    },
  },
};

export const useAddReview = () => {
  const [reviewState, setReviewState] = useState(DEFAULT_REVIEW_STATE);

  const onReviewChange = <T>(key: keyof IAddReviewFields, value: T) => {
    setReviewState(prevState => ({
      ...prevState,
      values: {
        ...prevState.values,
        [key]: value,
      },
    }));
  };

  const onReviewSubmit = () => {
    try {
      addReviewSchema.validateSync(reviewState.values, { abortEarly: false });
      alert("submitted");
    } catch (e) {
      if (e instanceof yup.ValidationError) {
        console.log(e);
        setReviewState(prevState => ({
          ...prevState,
          errors: {
            ...prevState.errors,
            ...(e as yup.ValidationError).inner.reduce(
              (acc, { path, message }) => ({
                ...acc,
                [path]: { error: true, text: message },
              }),
              {}
            ),
          },
        }));
      } else {
        throw e;
      }
    }
  };

  console.log(reviewState.errors);

  return {
    reviewState,
    onReviewChange,
    onReviewSubmit,
  };
};
