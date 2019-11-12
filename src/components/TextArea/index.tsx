import React, { useMemo } from "react";
import styled from "styled-components";

import { IInputStyleOptions, inputStyles } from "src/theme/snippets";

import { INPUT_VARIANTS } from "src/components/TextInput";
/*******************************************************************
 *                             **Types**                           *
 *******************************************************************/
export interface ITextAreaProps
  extends IInputStyleOptions,
    React.ComponentPropsWithoutRef<"textarea"> {}

/*******************************************************************
 *                            **Styles**                           *
 *******************************************************************/
const BaseTextArea = styled.textarea`
  ${inputStyles}

  min-height: 8em;

  resize: vertical;
  &::-webkit-resizer {
    display: none;
  }
`;

/*******************************************************************
 *                           **Component**                         *
 *******************************************************************/
const TextArea: React.FC<ITextAreaProps> = ({ variant = "", ...rest }) => {
  /**
   * Calculate the styles that will be applied to the Text component from the provided props.
   * If a variant is supplied, use those styles, and override with other props.
   * Otherwise, only apply styles specified in props.
   * Defaults are specified in `BaseText`.
   */
  const propsToApply = useMemo(() => {
    const stylesFromVariant =
      variant in INPUT_VARIANTS ? INPUT_VARIANTS[variant] : {};

    return {
      ...stylesFromVariant,
      ...rest, // override variant if needed
    };
  }, [rest, variant]);

  return <BaseTextArea {...propsToApply} />;
};
export default TextArea;
