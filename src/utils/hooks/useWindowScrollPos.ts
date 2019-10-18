import { useState, useEffect, useCallback } from "react";

export const useWindowScrollPos = () => {
  const [scrollPos, setScrollPos] = useState([
    window.pageXOffset,
    window.pageYOffset,
  ]);

  const handleScroll = useCallback(() => {
    setScrollPos([window.pageXOffset, window.pageYOffset]);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [handleScroll]);

  return scrollPos;
};
