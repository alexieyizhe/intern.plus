import React from "react";
import styled from "styled-components";

/*******************************************************************
 *                            **Types**                            *
 *******************************************************************/
export interface ICardProps extends React.ComponentPropsWithRef<"div"> {
  color?: string;
}

/*******************************************************************
 *                            **Styles**                           *
 *******************************************************************/
const BaseCard = styled.div`
  display: inline-block;

  border-radius: ${({ theme }) => theme.borderRadius.large}px;
  background-color: ${({ color = "inherit", theme }) =>
    theme.color[color] ?? color};
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
