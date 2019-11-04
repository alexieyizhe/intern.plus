import { useState, useEffect } from "react";
import { deviceBreakpoints } from "src/theme/mediaQueries";

export const useWindowWidth = () => {
  const [windowWidth, setWidth] = useState(window.innerWidth);

  const handleWindowResize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return {
    windowWidth,
    isMobile: windowWidth <= deviceBreakpoints.largeMobile,
    isTablet:
      windowWidth > deviceBreakpoints.largeMobile &&
      windowWidth <= deviceBreakpoints.tablet,
  };
};
