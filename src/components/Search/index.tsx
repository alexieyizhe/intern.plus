import React, { useCallback } from "react";
import styled from "styled-components";

import Combo, { IComboProps } from "src/components/Combo";
import Button from "src/components/Button";
import Text from "src/components/Text";
import TextInput from "src/components/TextInput";

export interface ISearchProps extends IComboProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchStart: () => void;
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

// TODO: add custom text to display as placeholder, search button text
const Search: React.FC<ISearchProps> = ({
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
        placeholder="Find something"
      />
      <Button color="greenDark" onClick={onSearchStart}>
        <Text variant="body" color="white">
          Search
        </Text>
      </Button>
    </Container>
  );
};

export default Search;
