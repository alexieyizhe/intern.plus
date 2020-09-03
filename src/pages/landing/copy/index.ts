import { RouteName } from "src/shared/constants/routing";
import { StarCityImg } from "src/assets";
import { LandingTab } from "../constants";

const pageCopy = {
  splashCard: {
    heading: "Great internships are priceless.",
    subheading: "Upgrade your search with intern+.", // i dont like this
    searchButtonText: "Start searching",
    splashImg: {
      src: StarCityImg,
      alt: "A city with star ratings hovering over buildings.",
    },
  },
  sections: {
    [LandingTab.TOP_COMPANIES]: {
      heading: "Top companies",
      subLink: {
        text: "See more companies",
        to: `${RouteName.COMPANIES}`,
      },
    },
    [LandingTab.RECENTLY_REVIEWED]: {
      heading: "Recently reviewed",
      subLink: {
        text: "See more reviews",
        to: `${RouteName.REVIEWS}`,
      },
    },
  },
  errorText: "An error has occurred. Please try again.",
};

export default pageCopy;
