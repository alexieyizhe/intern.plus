import React, { useState, useMemo, useCallback } from "react";
import styled from "styled-components";
import classNames from "classnames";

import Icon from "src/components/Icon";
import { IconName } from "../Icon/icons";

export interface IStarRatingProps
  extends React.ComponentPropsWithoutRef<"div"> {
  /**
   * Affects appearance of the component
   */
  size?: number;

  maxStars: number; // total number of stars
  filledStars: number; // number of filled stars
  /**
   * Callback for when a star is clicked.
   */
  onClickStar?: (starIndex: number) => void;
  /**
   * Whether stars should be clickable.
   */
  readOnly?: boolean;
}

const Container = styled.span`
  display: inline-flex;
  align-items: center;

  & > .starContainer {
    display: inline-flex;
    align-items: center;
    margin-right: 3px;
  }
`;

const Star = styled.span`
  display: inline-flex;
  justify-content: center;
  align-items: center;

  &:not(.read-only) {
    cursor: pointer;
  }

  & > div {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    pointer-events: none;
  }
`;

const StarRating: React.FC<IStarRatingProps> = ({
  size = 16,
  maxStars,
  filledStars,
  onClickStar,
  readOnly,
  children,
  ...rest
}) => {
  const [hoverStars, setHoverStars] = useState<number | false>(false);

  const internalOnMouseHover = useCallback(
    (hoverStarIndex: number, enter: boolean) => () => {
      if (!readOnly) {
        if (enter) setHoverStars(hoverStarIndex + 1);
        else setHoverStars(false);
      }
    },
    [readOnly]
  );

  const internalOnClick = useCallback(
    (starIndex: number) => () => {
      if (!readOnly && onClickStar) onClickStar(starIndex);
    },
    [readOnly, onClickStar]
  );

  // boolean array where true = filled star, false = empty
  // used to render stars
  const stars = useMemo(
    () =>
      [...new Array(maxStars)].map((_, i) => i < (hoverStars || filledStars)),
    [filledStars, hoverStars, maxStars]
  );

  return (
    <Container {...rest}>
      <span className="starContainer">
        {stars.map((filled, i) => (
          <Star
            className={classNames({ filled, "read-only": readOnly })}
            key={`star${i}${filled ? "filled" : ""}`}
            onClick={internalOnClick(i)}
            onMouseEnter={internalOnMouseHover(i, true)}
            onMouseLeave={internalOnMouseHover(i, false)}
          >
            <Icon
              name={filled ? IconName.STAR_FILLED : IconName.STAR_EMPTY}
              size={size}
            />
          </Star>
        ))}
      </span>
      {children}
    </Container>
  );
};

export default StarRating;
