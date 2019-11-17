import { useState } from "react";
import { OptionTypeBase } from "react-select/src/types";

export interface IAddReviewFields {
  company: OptionTypeBase; // label is company name, value is company slug
  job: OptionTypeBase; // label is job name, value is job id
  location: OptionTypeBase;
  body: string;
  overallRating: number;
  meaningfulWorkRating: number;
  workLifeBalanceRating: number;
  learningMentorshipRating: number;
  salary: number;
  salaryCurrency: OptionTypeBase;
  salaryPeriod: OptionTypeBase;
  tags: OptionTypeBase[];
  authorEmail: string;
}

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
    job: {},
    company: {},
    location: {},
    body: "",
    overallRating: undefined,
    meaningfulWorkRating: undefined,
    workLifeBalanceRating: undefined,
    learningMentorshipRating: undefined,
    salary: undefined,
    salaryCurrency: {},
    salaryPeriod: {},
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
    alert("submitted");
  };

  return {
    reviewState,
    onReviewChange,
    onReviewSubmit,
  };
};
