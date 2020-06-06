import { Size } from "src/theme/helpers";

// constants that are the same across light/dark themes
export const sharedConstants = {
  fontSize: {
    [Size.XS]: 12,
    [Size.SMALL]: 14,
    [Size.MEDIUM]: 18,
    [Size.LARGE]: 24,
    [Size.XL]: 34,
  },
  fontFamily: {
    heading:
      'Sharp Sans, Ubuntu, Cantarell, "Helvetica Neue", apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    body:
      'Roboto, Oxygen-Sans, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },
  boxShadow: {
    hover: "0px 10px 25px rgba(50, 50, 50, 0.1)",
  },
  borderRadius: {
    large: 10,
    small: 5,
  },
  zIndex: {
    modal: 200,
    header: 100,
  },
  padding: {
    input: "12px 20px",
    display: "60px 80px",
    displayMobile: "30px 40px",
    pageVertical: 10,
    pageHorizontal: 100,
    pageHorizontalMobile: 40,
  },
  maxWidth: {
    page: 1300,
  },
};
