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
      alt: "A pencil icon, to be clicked to write a new review",
    },
    openIcon: {
      src: XCloseIcon,
      alt: "A close X icon, which closes the add review modal when clicked",
    },
  },
};
