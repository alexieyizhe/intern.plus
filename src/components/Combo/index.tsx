import React from "react";
import styled from "styled-components";

export interface IComboProps extends React.ComponentPropsWithoutRef<"div"> {}

const Container = styled.div`
  position: relative;

  display: inline-flex;
  justify-content: space-between;
  align-items: center;
`;

const Combo: React.FC<IComboProps> = ({ children, ...rest }) => {
  if (React.Children.count(children) !== 2)
    throw new Error("Combo component must have exactly 2 children.");

  return <Container {...rest}>{children}</Container>;
};

export default Combo;
