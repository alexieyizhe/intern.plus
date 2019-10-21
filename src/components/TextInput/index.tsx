import React, { useMemo } from "react";
import styled from "styled-components";

import { VariantList } from "src/theme/constants";
import { IInputStyleOptions, inputStyles } from "src/theme/snippets";

import { TEXT_VARIANTS, ITextProps } from "src/components/Text";

/*******************************************************************
 *                             **Types**                           *
 *******************************************************************/
export interface ITextInputProps
  extends IInputStyleOptions,
    React.ComponentPropsWithoutRef<"input"> {}

/*******************************************************************
 *                  **Utility functions/constants**                *
 *******************************************************************/
/**
 * Transform text variants into a shape that matches the TextInput props.
 * Ensures consistency across multiple parts of the site using the same
 * style (i.e. different pages using the same input styles) and between
 * components (Text, TextInput, Button, Select, etc)
 */
export const INPUT_VARIANTS: VariantList<IInputStyleOptions> = Object.keys(
  TEXT_VARIANTS
).reduce(
  (acc, key) => {
    (acc[key] as Partial<IInputStyleOptions>).textSize = acc[key].size;
    delete acc.size;
    return acc;
  },
  { ...TEXT_VARIANTS } as VariantList<ITextProps>
);

/*******************************************************************
 *                            **Styles**                           *
 *******************************************************************/
const BaseTextInput = styled.input`
  ${inputStyles}
`;

/*******************************************************************
 *                           **Component**                         *
 *******************************************************************/
const TextInput: React.FC<ITextInputProps> = ({ variant = "", ...rest }) => {
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

  return <BaseTextInput {...propsToApply} />;
};
export default TextInput;
