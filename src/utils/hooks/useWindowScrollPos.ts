import { useState, useEffect } from "react";

const useWindowScrollPos = () => {
  const [scrollPos, setScrollPos] = useState([
    window.pageXOffset,
    window.pageYOffset,
  ]);

  const handleScroll = () => {
    setScrollPos([window.pageXOffset, window.pageYOffset]);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return scrollPos;
};

export default useWindowScrollPos;
