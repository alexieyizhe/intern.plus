import React, { useState, useCallback, useRef, useEffect } from "react";
import { debounce } from "debounce";
import styled from "styled-components";

import { useQueryParam } from "src/utils/hooks/useQueryParam";

import Search from "src/components/Search";
import { HEADER_HEIGHT } from "src/components/PageHeader";

export interface ISearchHandlerProps
  extends React.ComponentPropsWithoutRef<"div"> {
  onNewSearchVal: (val: string) => void;
}

const StickySearch = styled(Search)`
  position: sticky;
  top: ${HEADER_HEIGHT + 10}px;

  z-index: 50;
`;

export const SEARCH_VALUE_QUERY_PARAM_KEY = "q";

const SearchHandler: React.FC<ISearchHandlerProps> = ({
  onNewSearchVal,
  ...rest
}) => {
  /**
   * Grab the query if it is provided in a query parameter.
   */
  const defaultQueryVal = useQueryParam(SEARCH_VALUE_QUERY_PARAM_KEY) as string; // search query to start with

  /**
   * Track the current value in the search box.
   */
  const [searchVal, setSearchVal] = useState(defaultQueryVal || "");
  const searchOnChange = useCallback(
    // TODO: debounce this
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchVal(e.target.value);
    },
    []
  );

  // track debounce with ref (see https://overreacted.io/making-setinterval-declarative-with-react-hooks/)
  const debouncedLastSearchUpdater = useRef(debounce(onNewSearchVal, 1500));
  useEffect(() => {
    if (searchVal) {
      debouncedLastSearchUpdater.current(searchVal);
    }
  }, [searchVal]);

  return (
    <StickySearch
      className="search-input"
      value={searchVal}
      onChange={searchOnChange}
      onSearchStart={() => onNewSearchVal(searchVal)}
      {...rest}
    />
  );
};

export default SearchHandler;
