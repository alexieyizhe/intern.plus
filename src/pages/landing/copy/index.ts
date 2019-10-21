import { RouteName } from "src/utils/constants";
import { StarCityImg } from "src/assets";

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
    topCompanies: {
      heading: "Top companies",
      subLink: {
        text: "See more companies",
        to: `${RouteName.COMPANIES}`,
      },
    },
    recentlyReviewed: {
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
