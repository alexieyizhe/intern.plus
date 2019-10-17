import { RouteName } from "src/utils/routes";
import { LandingDockImg } from "src/assets";

const pageCopy = {
  splashCard: {
    heading: "Great internships are priceless.",
    subheading: "Tugboat helps steer you towards them.",
    searchButtonText: "Start searching",
    splashImg: {
      src: LandingDockImg,
      alt: "An illustration of a harbour with containers being unloaded.",
    },
  },
  sections: {
    topCompanies: {
      heading: "Top companies",
      subLink: {
        text: "See more companies",
        to: `${RouteName.FIND}/companies`,
      },
    },
    recentlyReviewed: {
      heading: "Recently reviewed",
      subLink: {
        text: "See more reviews",
        to: `${RouteName.FIND}/reviews`,
      },
    },
  },
  errorText: "An error has occurred. Please try again.",
};

export default pageCopy;
