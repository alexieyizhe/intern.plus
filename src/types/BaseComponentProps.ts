import React from "react";

/**
 * All possible props that an React element can accept.
 */
export type IBaseComponentProps<
  T extends React.ElementType
> = React.ComponentPropsWithoutRef<T>;
