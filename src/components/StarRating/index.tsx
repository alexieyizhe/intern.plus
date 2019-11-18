import React, { useState, useMemo, useCallback } from "react";
import styled from "styled-components";
import classNames from "classnames";

import Icon from "src/components/Icon";
import { IconName } from "../Icon/icons";

/*******************************************************************
 *                            **Types**                            *
 *******************************************************************/
export interface IStarRatingProps
  extends Omit<React.ComponentPropsWithoutRef<"div">, "onChange"> {
  /**
   * Affects appearance of the component
   */
  size?: number;

  maxStars: number; // total number of stars
  value?: number; // number of filled stars
  /**
   * Callback for when a star is clicked.
   */
  onChange?: (numStars: number) => void;
  /**
   * Whether stars should be clickable.
   */
  readOnly?: boolean;
  disabled?: boolean;
}

/*******************************************************************
 *                            **Styles**                           *
 *******************************************************************/
const Container = styled.span`
  display: inline-flex;
  align-items: center;

  & > .star-container {
    display: inline-flex;
    align-items: center;
    margin-right: 3px;
  }
`;

const Star = styled.span`
  display: inline-flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  &.read-only,
  &.disabled {
    cursor: not-allowed;
  }

  & > div {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    pointer-events: none;
  }
`;

/*******************************************************************
 *                           **Component**                         *
 *******************************************************************/
const StarRating: React.FC<IStarRatingProps> = ({
  size = 16,
  color,
  maxStars,
  value = 0,
  onChange,
  readOnly,
  disabled,
  children,
  ...rest
}) => {
  const [hoverStars, setHoverStars] = useState<number | false>(false);

  const internalOnMouseHover = useCallback(
    (hoverStarIndex: number, enter: boolean) => () => {
      if (!readOnly && !disabled) {
        if (enter) setHoverStars(hoverStarIndex + 1);
        else setHoverStars(false);
      }
    },
    [disabled, readOnly]
  );

  const internalOnClick = useCallback(
    (starIndex: number) => () => {
      if (!readOnly && !disabled && onChange) {
        if (starIndex + 1 === value) {
          onChange(0);
        } else {
          onChange(starIndex + 1);
        }
      }
    },
    [readOnly, disabled, onChange, value]
  );

  // boolean array where true = filled star, false = empty
  // used to render stars
  const stars = useMemo(
    () => [...new Array(maxStars)].map((_, i) => i < (hoverStars || value)),
    [hoverStars, maxStars, value]
  );

  return (
    <Container {...rest}>
      <span className="star-container">
        {stars.map((filled, i) => (
          <Star
            className={classNames({
              filled,
              "read-only": readOnly,
              disabled: disabled,
            })}
            key={`star${i}${filled ? "filled" : ""}`}
            onClick={internalOnClick(i)}
            onMouseEnter={internalOnMouseHover(i, true)}
            onMouseLeave={internalOnMouseHover(i, false)}
          >
            <Icon
              name={filled ? IconName.STAR_FILLED : IconName.STAR_EMPTY}
              size={size}
              color={disabled ? "greyDark" : color}
            />
          </Star>
        ))}
      </span>
      {children}
    </Container>
  );
};

export default StarRating;
