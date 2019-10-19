import {
  LogoBlack,
  XCloseIcon,
  EditIcon,
  MobileMenuChevronImg,
} from "src/assets";

export default {
  logo: {
    src: LogoBlack,
    text: "Tugboat",
    alt: "An icon depicting a tugboat",
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
