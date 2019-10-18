import React, { useState, useCallback, useRef, useEffect } from "react";
import { debounce } from "debounce";

import InputButtonCombo from "src/components/InputButtonCombo";

/*******************************************************************
 *                             **Types**                           *
 *******************************************************************/
export interface ISearchHandlerProps
  extends React.ComponentPropsWithoutRef<"div"> {
  defaultSearchVal?: string;
  onNewSearchVal: (val: string) => void;
}

/*******************************************************************
 *                           **Component**                         *
 *******************************************************************/
const SearchHandler: React.FC<ISearchHandlerProps> = ({
  defaultSearchVal,
  onNewSearchVal,
  ...rest
}) => {
  /**
   * Track the current value in the search box.
   */
  const [searchVal, setSearchVal] = useState(defaultSearchVal || "");
  const searchOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchVal(e.target.value);
    },
    []
  );

  /**
   * Store debounced callback function in a ref to prevent timeouts from being
   * set and cleared on renders errantly.
   * (see https://overreacted.io/making-setinterval-declarative-with-react-hooks/)
   */
  const debouncedLastSearchUpdater = useRef(debounce(onNewSearchVal, 1500));

  return (
    <InputButtonCombo
      placeholder="Find something"
      value={searchVal}
      onChange={searchOnChange}
      onEnterTrigger={() => onNewSearchVal(searchVal)}
      buttonText="Search"
      {...rest}
    />
  );
};

export default SearchHandler;
