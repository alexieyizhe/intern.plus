import {
  LogoText,
  XCloseIcon,
  EditIcon,
  MobileMenuChevronImg,
} from "src/assets";

export default {
  logo: {
    src: LogoText,
    alt: "Logo of intern+",
  },
  mobileToggle: {
    src: MobileMenuChevronImg,
    alt:
      "A chevron, indicating that the logo can be clicked to open mobile menu",
  },
  addReview: {
    closedIcon: {
      src: EditIcon,
      alt: "Pencil icon to add review",
    },
    openIcon: {
      src: XCloseIcon,
      alt: "Icon to dismiss add review modal",
    },
  },
};
