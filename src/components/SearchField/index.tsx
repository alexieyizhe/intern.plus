import React, { useState, useCallback, useRef, useMemo } from "react";
import styled from "styled-components";
import { debounce } from "debounce";

import { useSearchParams } from "src/utils/hooks/useSearchParams";
import { useWindowScrollPos } from "src/utils/hooks/useWindowScrollPos";

import InputButtonCombo from "src/components/InputButtonCombo";

/*******************************************************************
 *                             **Types**                           *
 *******************************************************************/
export interface ISearchFieldProps extends React.ComponentPropsWithRef<"div"> {
  onTriggerSearch: (val: string) => void;
}

const Container = styled(InputButtonCombo)`
  position: sticky;
  top: 90px;

  z-index: ${({ theme }) => theme.zIndex.header};

  &::after {
    content: "";
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 100%;
    top: 0;

    border-radius: ${({ theme }) => theme.borderRadius.button}px;
    box-shadow: ${({ theme }) => theme.boxShadow.hover};

    transition: all 150ms ease-in;
    opacity: 0;
  }

  &.scrolled::after {
    opacity: 1;
  }
`;

/*******************************************************************
 *                           **Component**                         *
 *******************************************************************/
const SearchField: React.FC<ISearchFieldProps> = ({
  onTriggerSearch,
  ...rest
}) => {
  const [, scrollY] = useWindowScrollPos();
  const scrolledDown = useMemo(() => scrollY > 0, [scrollY]);

  const { searchQuery } = useSearchParams();

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
    <Container
      className={`${scrolledDown ? "scrolled" : ""}`}
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
