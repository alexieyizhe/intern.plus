import React, { useState, useCallback, useMemo, useEffect } from "react";
import styled from "styled-components";

import { useQueryParam } from "src/utils/hooks/useQueryParam";
import pageCopy from "./copy";
import { getHeadingMarkup } from "./utils";

import {
  PageContainer as BasePageContainer,
  Search,
  Text,
} from "src/components";
import ResultsDisplay from "./components/ResultsDisplay";

export const SEARCH_VALUE_QUERY_PARAM_KEY = "q";

const PageContainer = styled(BasePageContainer)`
  & > .search-input {
    width: 100%;
  }
`;

const SearchPage = () => {
  const defaultQueryVal = useQueryParam(SEARCH_VALUE_QUERY_PARAM_KEY) as string;

  const [searchVal, setSearchVal] = useState(defaultQueryVal || ""); // TODO: use query params to get search
  const searchOnChange = useCallback(
    // TODO: debounce this
    (e: React.ChangeEvent<HTMLInputElement>) => setSearchVal(e.target.value),
    []
  );
  const searchOnStart = useCallback(() => {}, []);

  const headingMarkup = useMemo(() => getHeadingMarkup(searchVal), [searchVal]);

  /**
   * Every time the search query is updated, update the search results.
   * We debounce the onChange call, so this search call is not called excessively.
   */
  useEffect(() => {
    if (searchVal) console.log("searching for", searchVal);
  }, [searchVal]);

  return (
    <PageContainer>
      {headingMarkup}

      <Search
        className="search-input"
        value={searchVal}
        onChange={searchOnChange}
        onSearchStart={searchOnStart}
      />

      {/* <ResultsDisplay /> */}
    </PageContainer>
  );
};

export default SearchPage;
