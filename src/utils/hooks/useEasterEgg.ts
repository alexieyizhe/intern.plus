import { useEffect, useCallback, useState } from "react";
import { useSiteContext, ActionType } from "src/utils/context";

const UP = 38;
const DOWN = 40;
const LEFT = 37;
const RIGHT = 39;
const A = 65;
const B = 66;

const CODE_SEQUENCE = [UP, UP, DOWN, DOWN, LEFT, RIGHT, LEFT, RIGHT, B, A]; // konami code

export const useEasterEgg = () => {
  const { dispatch } = useSiteContext();

  const [sequenceSoFar, setSequenceSoFar] = useState(0);

  const trackCode = useCallback(
    (e: KeyboardEvent) => {
      if (e.keyCode === CODE_SEQUENCE[sequenceSoFar]) {
        setSequenceSoFar(prevSequence => prevSequence + 1);
      } else {
        setSequenceSoFar(0);
      }
    },
    [sequenceSoFar]
  );

  useEffect(() => {
    if (sequenceSoFar === CODE_SEQUENCE.length) {
      console.log(":0");
      dispatch({ type: ActionType.TOGGLE_EASTER_EGG });
    }
  }, [dispatch, sequenceSoFar]);

  useEffect(() => {
    window.addEventListener("keydown", trackCode);

    return () => window.removeEventListener("keydown", trackCode);
  });
};
