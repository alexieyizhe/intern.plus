import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactGA from "react-ga";

export const initAnalytics = (options = {}) => {
  if (process.env.REACT_APP_GA_TRACKING_ID) {
    ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_ID, {
      debug: process.env.REACT_APP_GA_DEBUG === "true",
      ...options,
    });
  }

  return !!process.env.REACT_APP_GA_TRACKING_ID;
};

const Analytics: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    ReactGA.set({ page: location.pathname });
    ReactGA.pageview(location.pathname);
  }, [location.pathname]);

  // don't actually render anything
  return null;
};

export default Analytics;
