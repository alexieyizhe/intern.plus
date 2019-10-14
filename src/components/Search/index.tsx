import React, { useState, useCallback } from "react";
import styled from "styled-components";

import Combo, { IComboProps } from "src/components/Combo";
import Button from "src/components/Button";
import Text from "src/components/Text";
import TextInput from "src/components/TextInput";

export interface ISearchProps extends IComboProps {
  onSearchStart: (value: string) => void;
}

const Container = styled(Combo)`
  & > *:first-child {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  & > button {
    transform: translateX(-${({ theme }) => theme.borderRadius.button}px);
  }
`;

// TODO: eventually will need to make this a controlled component to do validation, clear field, etc
// TODO: add custom text to display as placeholder, search button text
const Search: React.FC<ISearchProps> = ({ onSearchStart, ...rest }) => {
  const [inputContents, setInputContents] = useState("");

  const internalOnSearchStart = useCallback(
    () => onSearchStart(inputContents),
    [inputContents, onSearchStart]
  );

  const internalOnKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.keyCode === 13) internalOnSearchStart();
    },
    [internalOnSearchStart]
  );

  const inputOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputContents(e.target.value);
      console.log(e, e.target.value);
    },
    []
  );

  return (
    <Container {...rest}>
      <TextInput
        color="greyLight"
        onChange={inputOnChange}
        onKeyDown={internalOnKeyDown}
        placeholder="Find something"
      />
      <Button color="greenDark" onClick={internalOnSearchStart}>
        <Text variant="body" color="white">
          Search
        </Text>
      </Button>
    </Container>
  );
};

export default Search;
