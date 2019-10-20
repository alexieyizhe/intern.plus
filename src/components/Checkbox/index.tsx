import React from "react";
import styled, { css } from "styled-components";

export interface ICheckboxProps
  extends Omit<React.ComponentPropsWithoutRef<"input">, "value"> {
  value: boolean;
  size?: number;
}

const DEFAULT_CHECKBOX_SIZE = 20;

const Container = styled.span`
  display: inline-flex;
  align-items: center;
`;

const Stack = styled.span`
  position: relative;
  display: inline-grid;
  justify-content: center;
  align-items: center;

  & > * {
    grid-row: 1;
    grid-column: 1;
  }
`;

const sharedStyles = css<{ size?: number }>`
  display: inline-block;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
`;

const focusedStyles = css`
  border: 2px solid ${({ theme }) => theme.color.black};
`;

const checkedStyles = css`
  background-color: ${({ theme }) => theme.color.black};
`;

const disabledStyles = css`
  &:disabled {
    cursor: not-allowed;
  }

  &:not(:disabled) {
    cursor: pointer;
  }
`;

const HiddenCheckbox = styled.input.attrs({ type: "checkbox" })`
  ${sharedStyles}
  margin: 0;
  padding: 0;
  z-index: 2;

  /* Hide checkbox visually but remain accessible to screen readers. */
  opacity: 0;

  ${disabledStyles}
`;

const StyledCheckbox = styled.span<{ size?: number }>`
  ${sharedStyles}

  background-color: ${({ theme }) => theme.color.greyLight};
  border-radius: ${({ theme }) => theme.borderRadius.checkbox}px;
  z-index: 1;

  ${HiddenCheckbox}:not(:disabled):hover + &,
  ${HiddenCheckbox}:not(:disabled).focus-visible + & {
    ${focusedStyles}
  }


  ${HiddenCheckbox}:checked + & {
    ${checkedStyles}
  }
`;

const Checkbox: React.FC<ICheckboxProps> = ({
  className,
  value,
  size = DEFAULT_CHECKBOX_SIZE,
  type, // unused
  children,
  ...rest
}) => (
  <Container className={className}>
    <Stack>
      <HiddenCheckbox size={size} checked={value} {...rest} />
      <StyledCheckbox size={size} />
    </Stack>
    {children}
  </Container>
);

export default Checkbox;
