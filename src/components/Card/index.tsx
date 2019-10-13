import React from "react";
import styled from "styled-components";

export interface ICardProps extends React.ComponentPropsWithoutRef<"div"> {
  color?: string;
}
const BaseCard = styled.div`
  display: inline-block;
  padding: 15px 20px;

  border-radius: ${({ theme }) => theme.borderRadius.button}px;
  background-color: ${({ color = "", theme }) =>
    theme.color[color] || color || "inherit"};
`;

const Card: React.FC<ICardProps> = ({ children, ...rest }) => (
  <BaseCard {...rest}>{children}</BaseCard>
);

export default Card;
