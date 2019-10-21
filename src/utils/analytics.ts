import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactGA from "react-ga";
import ttiPolyfill from "tti-polyfill";

export const init = (options = {}) => {
  if (process.env.REACT_APP_GA_TRACKING_ID) {
    ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_ID, {
      debug: process.env.REACT_APP_GA_DEBUG === "true",
      gaOptions: {
        siteSpeedSampleRate: 100,
      },
      ...options,
    });
  }

  /**
   * Track timing of server requests.
   */
  const callback: PerformanceObserverCallback = list => {
    list.getEntries().forEach(entry => {
      timing({
        category: "Load Performace",
        variable: "Server latency",
        value:
          ((entry as PerformanceNavigationTiming).responseStart -
            (entry as PerformanceNavigationTiming).requestStart) *
          1000,
      });
    });
  };

  const observer = new PerformanceObserver(callback);
  observer.observe({ entryTypes: ["navigation"] });

  ttiPolyfill.getFirstConsistentlyInteractive().then(tti => {
    if (tti) {
      timing({
        category: "Load Performace",
        variable: "Time to interactive",
        value: tti,
      });
    }
  });

  // if analytics was initialized or not
  return !!process.env.REACT_APP_GA_TRACKING_ID;
};

export const event = (args: ReactGA.EventArgs) => ReactGA.event(args);
export const timing = (args: ReactGA.TimingArgs) => ReactGA.timing(args);

const Analytics: React.FC = () => {
  const location = useLocation();

  /**
   * Track each navigation to a page.
   */
  useEffect(() => {
    ReactGA.set({ page: location.pathname });
    ReactGA.pageview(location.pathname);
  }, [location.pathname]);

  // don't actually render anything
  return null;
};

export default Analytics;
