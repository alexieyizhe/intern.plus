import { OptionTypeBase } from "react-select/src/types";

import { useSearchParams } from "src/shared/hooks/useSearchParams";
import { SearchSort } from "src/shared/constants/search";

const options = [
  { label: "alphabetically", value: SearchSort.ALPHABETICAL },
  { label: "by review count", value: SearchSort.NUM_REVIEWS },
  { label: "by rating", value: SearchSort.RATING },
  { label: "by salary", value: SearchSort.SALARY },
];

const getOptionFromValue = (value: SearchSort) =>
  options.filter(option => option.value === value)[0];

export const useSearchSort = () => {
  const { searchSort, setSearchSort } = useSearchParams();

  return {
    options,
    value: searchSort && getOptionFromValue(searchSort),
    onChange: (option: OptionTypeBase) => setSearchSort(option.value),
  };
};
