import React from "react";
import styled from "styled-components";
import classNames from "classnames";

/*******************************************************************
 *                            **Types**                            *
 *******************************************************************/
export interface ITagProps extends React.ComponentPropsWithoutRef<"div"> {
  color?: string;
}

/*******************************************************************
 *                            **Styles**                           *
 *******************************************************************/
const Container = styled.div`
  position: relative;
  padding: 3px 6px;

  display: inline-block;

  opacity: 0.7;
  border-radius: 3px;
  background-color: ${({ color = "", theme }) =>
    theme.color[color] ?? (color || "inherit")};
`;

/*******************************************************************
 *                           **Component**                         *
 *******************************************************************/
const Tag: React.FC<ITagProps> = ({ className, color, children, ...rest }) => (
  <Container className={classNames(className, "tag")} color={color} {...rest}>
    {children}
  </Container>
);

export default Tag;
