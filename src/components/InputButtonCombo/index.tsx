import React, { useCallback } from "react";
import styled from "styled-components";

import Button from "src/components/Button";
import Text from "src/components/Text";
import TextInput from "src/components/TextInput";

export interface IInputButtonComboProps
  extends React.ComponentPropsWithRef<"div"> {
  inputColor?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEnterTrigger: () => void;

  buttonColor?: string;
  buttonText?: string;
  buttonTextColor?: string;
}

const ENTER_KEY_CODE = 13;

const Container = styled.div`
  position: relative;
  width: 100%;

  display: inline-flex;
  justify-content: space-between;
  align-items: center;

  & > input {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border-right: none !important;
  }

  & > button {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-left: none !important;
  }
`;

const InputButtonCombo: React.FC<IInputButtonComboProps> = ({
  inputColor = "greyLight",
  placeholder,
  value,
  onChange,
  onEnterTrigger,
  onKeyDown,
  buttonColor = "greenDark",
  buttonText,
  buttonTextColor = "white",
  ...rest
}) => {
  const internalOnKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (onKeyDown) onKeyDown(e); // make sure we don't break default original onKeyDown
      if (e.keyCode === ENTER_KEY_CODE) {
        onEnterTrigger();
        (e.target as HTMLInputElement).blur();
      }
    },
    [onEnterTrigger, onKeyDown]
  );

  return (
    <Container {...rest}>
      <TextInput
        color={inputColor}
        variant="body"
        value={value}
        onChange={onChange}
        onKeyDown={internalOnKeyDown}
        placeholder={placeholder}
      />
      <Button color={buttonColor} onClick={onEnterTrigger}>
        <Text variant="body" color="white">
          {buttonText}
        </Text>
      </Button>
    </Container>
  );
};

export default React.memo(InputButtonCombo);
