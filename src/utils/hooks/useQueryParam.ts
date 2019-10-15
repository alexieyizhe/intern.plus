/**
 * A hook to grab a specified query parameter value.
 * @param key The key to look for in query parameters
 * @returns The string or string array value corresponding to `key`, or `null` if the value is not found.
 */
import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";

export const useQueryParam = (key: string): string | string[] | null => {
  const { search } = useLocation();

  const queryParams = useMemo(() => queryString.parse(search), [search]);

  return queryParams[key] || null;
};
