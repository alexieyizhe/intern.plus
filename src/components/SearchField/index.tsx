import React, { useState, useCallback, useRef } from "react";
import { debounce } from "debounce";

import { useSearchParams } from "src/utils/hooks/useSearchParams";

import InputButtonCombo from "src/components/InputButtonCombo";

/*******************************************************************
 *                             **Types**                           *
 *******************************************************************/
export interface ISearchFieldProps
  extends React.ComponentPropsWithoutRef<"div"> {
  onTriggerSearch: (val: string) => void;
}

/*******************************************************************
 *                           **Component**                         *
 *******************************************************************/
const SearchField: React.FC<ISearchFieldProps> = ({
  onTriggerSearch,
  ...rest
}) => {
  const {
    searchQuery,
    // setSearchType, TODO: add ability to toggle filters
  } = useSearchParams();
  /**
   * Stores the current value in the search input.
   * Note that this is NOT the same as the current query, which is the last
   * input value that was actually executed as a query.
   */
  const [inputVal, setInputVal] = useState(searchQuery);
  /**
   * Store debounced callback function in a ref to prevent timeouts from being
   * set and cleared on renders errantly.
   * (see https://overreacted.io/making-setinterval-declarative-with-react-hooks/)
   */
  const debouncedOnTriggerSearch = useRef(debounce(onTriggerSearch, 1500));
  const onInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputVal(e.target.value);
      // debouncedLastSearchUpdater.current(e.target.value); TODO: enable this and test a lot
    },
    []
  );

  return (
    <InputButtonCombo
      placeholder="Find something"
      value={inputVal || ""}
      onChange={onInputChange}
      onEnterTrigger={() => onTriggerSearch(inputVal || "")}
      buttonText="Search"
      {...rest}
    />
  );
};

export default SearchField;
