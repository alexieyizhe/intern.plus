import { useCallback, useMemo } from "react";
import { OptionTypeBase } from "react-select/src/types";

import { useSearchParams } from "src/shared/hooks/useSearchParams";
import { slugify } from "src/shared/utils/misc";
import { MOCK_LOCATIONS } from "src/shared/mocks";
import {
  isCompanyCardItem,
  isJobCardItem,
  isReviewJobCardItem,
  IGenericCardItem,
} from "src/shared/constants/card";

const MAX_OPTIONS = 5;
const LOCATIONS =
  process.env.NODE_ENV === "production"
    ? [
        // TODO: handle this better lol
        "Ottawa, ON, Canada",
        "Santa Monica, CA, USA",
        "San Francisco, CA, USA",
        "Mountain View, CA, USA",
        "Palo Alto, CA, USA",
        "Toronto, ON, Canada",
        "Tokyo, Japan",
        "Menlo Park, CA, USA",
        "Foster City, CA, USA",
        "Austin, TX, USA",
        "Vancouver, BC, Canada",
        "Los Angeles, CA, USA",
        "Dublin, Ireland",
        "Bellevue, WA, USA",
        "New York, NY, USA",
        "Chicago, IL, USA",
        "Markham, ON, Canada",
        "Kitchener, ON, Canada",
        "Waterloo, ON, Canada",
        "Somerville, MA, USA",
        "Cambridge, MA, USA",
        "Jersey City, NJ, USA",
        "Burlington, ON, Canada",
        "London, UK",
        "San Mateo, CA, USA",
        "Cupertino, CA, USA",
        "Redwood City, CA, USA",
        "Calgary, AB, Canada",
        "Montreal, QC, Canada",
        "Boston, MA, USA",
        "Kirkland, WA, USA",
        "Hong Kong",
        "Seattle, WA, USA",
        "Mississauga, ON, Canada",
        "Germantown, MD, USA",
        "Pasadena, CA, USA",
        "Redmond, WA, USA",
        "Santa Clara, CA, USA",
        "Hamilton, ON, Canada",
        "Sunnyvale, CA, USA",
        "Stamford, CT, USA",
        "Irvine, CA, USA",
        "Fort Collins, CO, USA",
        "Cambridge, ON, Canada",
        "Rotterdam, Netherlands",
        "Guelph, ON, Canada",
        "Vaughan, ON, Canada",
        "Tsukuba, Ibaraki Prefecture, Japan",
        "Spring, TX 77373, USA",
        "Ajax, ON, Canada",
        "Vancouver, BC, CAN",
        "Brampton, ON, Canada",
        "Singapore",
        "Vancouver",
        "Ottawa",
        "Pune, Maharashtra, India",
        "Greenbelt, MD, USA",
        "Toronto",
        "Bengaluru, Karnataka, India",
        "Rome, NY, USA",
        "Waterloo",
        "London, ON, Canada",
        "Calgary",
        "San Francisco",
        "Miami, FL, USA",
        "Markham",
        "Toronto, Ontario, Canada",
        "Huntsville, ON, Canada",
        "美国加利福尼亚州森尼韦尔",
        "Newmarket, Ontario, Ontario, Canada",
        "Mississauga",
        "Campbell, CA, USA",
        "Kitchener",
        "Oakville, ON, Canada",
        "Winnipeg, MB, Canada",
        "North York",
        "Montreal",
        "Bellevue",
        "Oslo, Norway",
        "Gatineau, QC, Canada",
        "Burnaby, BC, Canada",
        "New York",
        "美国加利福尼亚州旧金山",
        "Newmarket, ON, Canada",
        "টরন্টো, অন্টারিও, কানাডা",
        "Pittsburgh, PA, USA",
        "美国华盛顿西雅图",
        "Fremont, CA, USA",
        "San Jose, CA, USA",
      ]
    : MOCK_LOCATIONS;

const buildOptions = (options: string[]): OptionTypeBase[] =>
  options.map(loc => ({
    label: loc,
    value: slugify(loc),
  }));

const DEFAULT_LOCATION_OPTIONS = buildOptions(LOCATIONS);

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

export const LOCATION_MAP = DEFAULT_LOCATION_OPTIONS.reduce(
  (acc, cur) => {
    acc[cur.value] = cur;
    return acc;
  },
  {} as { [key: string]: OptionTypeBase }
);

export const useSearchLocationFilter = (results?: IGenericCardItem[]) => {
  const { searchLocationFilter, setSearchLocationFilter } = useSearchParams();

  const options = useMemo(
    () =>
      results && results.length > 0
        ? buildOptions(getLocationSuggestions(results))
        : DEFAULT_LOCATION_OPTIONS,
    [results]
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
