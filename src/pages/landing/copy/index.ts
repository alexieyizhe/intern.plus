import { RouteName } from "src/utils/routes";

const pageCopy = {
  splashCard: {
    heading: "Great internships are priceless.",
    subheading: "Tugboat helps guide your search for one.",
    searchButtonText: "Browse reviews",
    splashImg: {
      src:
        "https://media.gettyimages.com/vectors/cargo-ship-and-harbour-flat-design-vector-id1176279865?s=2048x2048",
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
