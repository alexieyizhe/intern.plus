import React, { useState, useMemo, useCallback } from "react";
import styled from "styled-components";
import classNames from "classnames";

import Icon, { IconName } from "src/components/Icon";

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
  /**
   * Whether or not the stars are gold coloured.
   */
  golden?: boolean;
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
  maxStars,
  value: numFilled = 0,
  onChange,
  readOnly,
  disabled,
  golden,
  children,
  ...rest
}) => {
  const [numHovering, setNumHovering] = useState<number | false>(false);

  const internalOnMouseHover = useCallback(
    (hoverStarIndex: number, enter: boolean) => () => {
      if (!readOnly && !disabled) {
        if (enter) setNumHovering(hoverStarIndex + 1);
        else setNumHovering(false);
      }
    },
    [disabled, readOnly]
  );

  const internalOnClick = useCallback(
    (starIndex: number) => () => {
      if (!readOnly && !disabled && onChange) {
        if (starIndex + 1 === numFilled) {
          onChange(0);
        } else {
          onChange(starIndex + 1);
        }
      }
    },
    [readOnly, disabled, onChange, numFilled]
  );

  /**
   * boolean array where true = filled star, false = empty that's
   * used to render stars
   */
  const stars = useMemo(
    () => [...new Array(maxStars)].map((_, i) => i < numFilled),
    [maxStars, numFilled]
  );

  const starColor = useMemo(
    () => ({
      default: golden ? "goldSecondary" : "textTertiary",
      darker: golden ? "goldPrimary" : "textPrimary",
    }),
    [golden]
  );

  return (
    <Container {...rest}>
      <span className="star-container">
        {stars.map((filled, i) => {
          const isHovered = i < numHovering;
          const showDarkColor = readOnly || filled || isHovered;

          return (
            <Star
              className={classNames({
                filled,
                "read-only": readOnly,
                disabled: disabled,
              })}
              key={`star-${i}`}
              onClick={internalOnClick(i)}
              onMouseEnter={internalOnMouseHover(i, true)}
              onMouseLeave={internalOnMouseHover(i, false)}
            >
              <Icon
                name={filled ? IconName.STAR_FILLED : IconName.STAR_EMPTY}
                size={size}
                color={showDarkColor ? starColor.darker : starColor.default}
              />
            </Star>
          );
        })}
      </span>
      {children}
    </Container>
  );
};

export default StarRating;
