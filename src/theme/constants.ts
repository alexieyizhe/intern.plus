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
    white: "#ffffff",
  },
  fontSize: {
    [Size.XSMALL]: 0,
    [Size.SMALL]: 0,
    [Size.MEDIUM]: 0,
    [Size.LARGE]: 0,
    [Size.XLARGE]: 0,
  },
  fontFamily: {
    heading: "",
    body: "",
  },
};

export default constants;
