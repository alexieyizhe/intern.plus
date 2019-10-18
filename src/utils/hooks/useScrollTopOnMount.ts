import { useEffect } from "react";

export const useScrollTopOnMount = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
};
