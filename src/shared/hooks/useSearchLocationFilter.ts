import { useCallback, useMemo } from "react";
import { OptionTypeBase } from "react-select/src/types";

import { useSearchParams } from "src/shared/hooks/useSearchParams";
import {
  useLocationSuggestions,
  LOCATIONS,
} from "src/shared/hooks/useLocationSuggestions";
import { slugify } from "src/shared/utils/misc";
import {
  isCompanyCardItem,
  isJobCardItem,
  isReviewJobCardItem,
  IGenericCardItem,
} from "src/shared/constants/card";

const MAX_OPTIONS = 5;

const buildOptions = (options: string[]): OptionTypeBase[] =>
  options.map(loc => ({
    label: loc,
    value: slugify(loc),
  }));

const getLocationSuggestions = (results: IGenericCardItem[]) =>
  Array.from(
    results
      .flatMap(item => {
        if (isCompanyCardItem(item)) {
          return item.jobLocations;
        } else if (isJobCardItem(item)) {
          return item.location;
        } else if (isReviewJobCardItem(item)) {
          return item.jobLocation;
        }
        return null;
      })
      .filter(item => !!item)
      .reduce((acc, cur) => {
        acc.add(cur);
        return acc;
      }, new Set())
  ) as string[];

export const LOCATION_MAP = buildOptions(LOCATIONS).reduce((acc, cur) => {
  acc[cur.value] = cur;
  return acc;
}, {} as { [key: string]: OptionTypeBase });

export const useSearchLocationFilter = (results?: IGenericCardItem[]) => {
  const { searchLocationFilter, setSearchLocationFilter } = useSearchParams();

  const { suggestions: locationSuggestions } = useLocationSuggestions();

  const options = useMemo(
    () =>
      results && results.length > 0
        ? buildOptions(getLocationSuggestions(results))
        : buildOptions(locationSuggestions),
    [locationSuggestions, results]
  );

  const onChange = useCallback(
    (newOptions: OptionTypeBase[]) => {
      let newFilterVal;
      if (newOptions === null) {
        newFilterVal = newOptions;
      } else {
        newFilterVal =
          newOptions.length <= MAX_OPTIONS
            ? newOptions.map(option => option.value)
            : searchLocationFilter;
      }

      setSearchLocationFilter(newFilterVal);
    },
    [searchLocationFilter, setSearchLocationFilter]
  );

  return {
    options,
    value:
      searchLocationFilter &&
      searchLocationFilter.map(val => LOCATION_MAP[val]),
    onChange: onChange,
  };
};
