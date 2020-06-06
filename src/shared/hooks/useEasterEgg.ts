import { useEffect, useCallback, useState } from "react";
import { useEasterEggContext } from "src/contexts";

const UP = 38;
const DOWN = 40;
const LEFT = 37;
const RIGHT = 39;
const A = 65;
const B = 66;

const CODE_SEQUENCE = [UP, UP, DOWN, DOWN, LEFT, RIGHT, LEFT, RIGHT, B, A]; // konami code

/**
 * Toggles active status of an easter egg on the site,
 * just for funsies.
 */
export const useEasterEgg = () => {
  const { toggleEasterEgg } = useEasterEggContext();

  const [sequenceSoFar, setSequenceSoFar] = useState(0);

  const trackCode = useCallback(
    (e: KeyboardEvent) => {
      if (e.keyCode === CODE_SEQUENCE[sequenceSoFar]) {
        setSequenceSoFar((prevSequence) => prevSequence + 1);
      } else {
        setSequenceSoFar(0);
      }
    },
    [sequenceSoFar]
  );

  useEffect(() => {
    if (sequenceSoFar === CODE_SEQUENCE.length) {
      toggleEasterEgg();
    }
  }, [sequenceSoFar, toggleEasterEgg]);

  useEffect(() => {
    window.addEventListener("keydown", trackCode);

    return () => window.removeEventListener("keydown", trackCode);
  });
};
