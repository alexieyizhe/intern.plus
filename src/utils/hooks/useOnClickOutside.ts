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
type Handler = (event: PossibleEvent) => void;

export const useOnClickOutside = (
  ref: React.MutableRefObject<HTMLElement | null>,
  handler: Handler
) => {
  useEffect(() => {
    const listener = (event: PossibleEvent) => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }

      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
};
