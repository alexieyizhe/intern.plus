import React, { useCallback } from "react";
import styled from "styled-components";

import Button from "src/components/Button";
import Text from "src/components/Text";
import TextInput from "src/components/TextInput";

export interface ISearchProps extends React.ComponentPropsWithoutRef<"div"> {
  placeholder?: string;
  buttonText?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchStart: () => void;
}

const Container = styled.div`
  position: relative;
  width: 100%;

  display: inline-flex;
  justify-content: space-between;
  align-items: center;

  & > input {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  & > button {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
`;

const Search: React.FC<ISearchProps> = ({
  placeholder = "Find something",
  buttonText = "Search",
  value,
  onChange,
  onSearchStart,
  ...rest
}) => {
  const internalOnKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.keyCode === 13) onSearchStart();
    },
    [onSearchStart]
  );

  return (
    <Container {...rest}>
      <TextInput
        color="greyLight"
        value={value}
        onChange={onChange}
        onKeyDown={internalOnKeyDown}
        placeholder={placeholder}
      />
      <Button color="greenDark" onClick={onSearchStart}>
        <Text variant="body" color="white">
          {buttonText}
        </Text>
      </Button>
    </Container>
  );
};

export default Search;
