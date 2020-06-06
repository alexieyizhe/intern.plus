import { IconName } from "src/components/Icon";

export default {
  addReview: {
    closedIcon: {
      name: IconName.EDIT,
      alt: "Pencil icon to add review",
    },
    openIcon: {
      name: IconName.X_SQUARE,
      alt: "Icon to dismiss add review modal",
    },
  },
  toggleTheme: {
    dark: {
      name: IconName.MOON,
      alt: "Moon icon indicating dark mode",
    },
    light: {
      name: IconName.SUN,
      alt: "Sun icon indicating light mode",
    },
  },
};
