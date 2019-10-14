export enum Size {
  XSMALL = "xsmall",
  SMALL = "small",
  MEDIUM = "medium",
  LARGE = "large",
  XLARGE = "xlarge",
}

const constants = {
  color: {
    black: "#000000",
    greyDark: "#787878",
    greyMedium: "#C6C6C6",
    greyLight: "#F4F4F4",
    white: "#ffffff",

    error: "#DD4040",
  },
  fontSize: {
    [Size.SMALL]: 14,
    [Size.MEDIUM]: 18,
    [Size.LARGE]: 28,
    [Size.XLARGE]: 34,
  },
  fontFamily: {
    heading: "serif",
    body: "sans-serif",
  },
  boxShadow: {
    hover: "0px 2px 4px rgba(150, 150, 150, 0.1)",
  },
  borderRadius: {
    button: 10,
  },
};

export default constants;
