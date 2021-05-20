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
  options.map((loc) => ({
    label: loc,
    value: slugify(loc),
  }));

const getLocationSuggestions = (results: IGenericCardItem[]) =>
  Array.from(
    results
      .flatMap((item) => {
        if (isCompanyCardItem(item)) {
          return item.jobLocations;
        } else if (isJobCardItem(item)) {
          return item.location;
        } else if (isReviewJobCardItem(item)) {
          return item.jobLocation;
        }
        return null;
      })
      .filter((item) => !!item)
      .reduce((acc, cur) => {
        acc.add(cur);
        return acc;
      }, new Set())
  ) as string[];

export const LOCATION_MAP = buildOptions(LOCATIONS).reduce((acc, cur) => {
  acc[cur.value] = cur;
  return acc;
}, {} as { [key: string]: OptionTypeBase });

export const useSearchLocationFilter = () => {
  const { searchLocationFilter, setSearchLocationFilter } = useSearchParams();

  return {
    value: searchLocationFilter,
    onChange: setSearchLocationFilter,
  };
};
