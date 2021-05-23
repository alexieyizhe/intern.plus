import React from "react";
import styled from "styled-components";

/*******************************************************************
 *                            **Types**                            *
 *******************************************************************/
export interface ICardProps extends React.ComponentPropsWithRef<"div"> {
  backgroundColor?: string;
}

/*******************************************************************
 *                            **Styles**                           *
 *******************************************************************/
const BaseCard = styled.div<ICardProps>`
  display: inline-block;

  border-radius: ${({ theme }) => theme.borderRadius.large}px;
  background-color: ${({ backgroundColor = "inherit", theme }) =>
    theme.color[backgroundColor] ?? backgroundColor};
  transition: background-color 200ms ease;
`;

/*******************************************************************
 *                           **Component**                         *
 *******************************************************************/
const Card: React.FC<ICardProps> = React.forwardRef<HTMLDivElement, ICardProps>(
  ({ children, ...rest }, ref) => (
    <BaseCard {...rest} ref={ref}>
      {children}
    </BaseCard>
  )
);

export default Card;
