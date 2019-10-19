import { useEffect } from "react";
import { useRef } from "react";

type AnyObject = { [key: string]: any }; // eslint-disable-line @typescript-eslint/no-explicit-any

export const useUpdateTracer = <T extends AnyObject>(props: T) => {
  const prevProps = useRef<T>(props);

  useEffect(() => {
    const changedProps = Object.entries(props).reduce(
      (ps, [key, val]) => {
        if (prevProps.current[key] !== val) {
          ps[key] = [prevProps.current[key], val];
        }
        return ps;
      },
      {} as AnyObject
    );

    if (Object.keys(changedProps).length > 0) {
      console.debug("Changed props:", changedProps);
    }

    prevProps.current = props;
  });
};
