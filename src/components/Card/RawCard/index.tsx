import React from "react";
import styled from "styled-components";

export interface ICardProps extends React.ComponentPropsWithRef<"div"> {
  color?: string;
}
const BaseCard = styled.div`
  display: inline-block;

  border-radius: ${({ theme }) => theme.borderRadius.button}px;
  background-color: ${({ color = "", theme }) =>
    theme.color[color] || color || "inherit"};
`;

const Card: React.FC<ICardProps> = React.forwardRef<HTMLDivElement, ICardProps>(
  ({ children, ...rest }, ref) => (
    <BaseCard {...rest} ref={ref}>
      {children}
    </BaseCard>
  )
);

export default Card;
