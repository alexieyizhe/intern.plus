/**
 * Adapted from https://usehooks.com/useOnClickOutside/
 */
import { useEffect } from "react";

const MOUSEDOWN = "mousedown";
const TOUCHSTART = "touchstart";

type HandledEvents = [typeof MOUSEDOWN, typeof TOUCHSTART];
type HandledEventsType = HandledEvents[number];
type PossibleEvent = {
  [Type in HandledEventsType]: HTMLElementEventMap[Type];
}[HandledEventsType];
type Callback = (event: PossibleEvent) => void;

/**
 * Triggers a callback when a click event occurs outside
 * of a specified element.
 * @param ref a ref to the element tracking click outsides
 * @param callback a callback function to be executed when a click outside occurs
 */
export const useOnClickOutside = (
  ref: React.MutableRefObject<HTMLElement | null>,
  callback: Callback
) => {
  useEffect(() => {
    const listener = (event: PossibleEvent) => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }

      callback(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, callback]);
};
