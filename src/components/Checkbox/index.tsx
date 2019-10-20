import React from "react";
import styled, { css } from "styled-components";

export interface ICheckboxProps
  extends React.ComponentPropsWithoutRef<"input"> {}

const CHECKBOX_SIZE = 16;

const Container = styled.span`
  display: inline-flex;
  align-items: center;
`;

const Stack = styled.span`
  position: relative;
  display: inline-grid;
  justify-content: center;
  align-items: center;

  &:not(:only-child) {
    margin-right: 5px;
  }

  & > * {
    grid-row: 1;
    grid-column: 1;
  }
`;

const sharedStyles = css`
  display: inline-block;
  width: ${CHECKBOX_SIZE}px;
  height: ${CHECKBOX_SIZE}px;
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

const StyledCheckbox = styled.span`
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
  type, // unused
  children,
  ...rest
}) => (
  <Container className={className}>
    <Stack>
      <HiddenCheckbox {...rest} />
      <StyledCheckbox />
    </Stack>
    {children}
  </Container>
);

export default Checkbox;
