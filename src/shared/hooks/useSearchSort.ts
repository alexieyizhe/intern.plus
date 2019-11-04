import { useMemo } from "react";
import { OptionTypeBase } from "react-select/src/types";

import { useSearchParams } from "src/shared/hooks/useSearchParams";
import { SearchSort } from "src/shared/constants/search";

const defaultOptions: OptionTypeBase[] = [
  { label: "alphabetically", value: SearchSort.ALPHABETICAL },
  { label: "by review count", value: SearchSort.NUM_REVIEWS },
  { label: "by rating", value: SearchSort.RATING },
  { label: "by salary", value: SearchSort.SALARY },
];

const getOptionFromValue = (options: OptionTypeBase[], value: SearchSort) =>
  options.filter(option => option.value === value)[0];

export const useSearchSort = (availableSort?: SearchSort[]) => {
  const { searchSort, setSearchSort } = useSearchParams();

  const options = useMemo(
    () =>
      availableSort
        ? defaultOptions.filter(option => availableSort.includes(option.value))
        : defaultOptions,
    [availableSort]
  );
  return {
    options,
    value: searchSort && getOptionFromValue(options, searchSort),
    onChange: (option: OptionTypeBase) => setSearchSort(option.value),
  };
};
