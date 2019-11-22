export enum Size {
  XSMALL = "xsmall",
  SMALL = "small",
  MEDIUM = "medium",
  LARGE = "large",
  XLARGE = "xlarge",
}

export interface VariantList<T> {
  [variant: string]: Partial<T>;
}

const constants: { [style: string]: { [key: string]: string | number } } = {
  color: {
    black: "#000000",
    greyDark: "#787878",
    greyMedium: "#C6C6C6",
    greyLight: "#F1F1F1",
    white: "#FFFFFF",

    greenDark: "#507561",
    greenMedium: "#779e89",
    greenLight: "#a6bdb1",

    goldDark: "#CFB316",
    goldLight: "#ffdc76",

    error: "#FF6166",
  },
  fontSize: {
    [Size.XSMALL]: 12,
    [Size.SMALL]: 14,
    [Size.MEDIUM]: 18,
    [Size.LARGE]: 24,
    [Size.XLARGE]: 34,
  },
  fontFamily: {
    heading:
      'Sharp Sans,Ubuntu,Cantarell,"Helvetica Neue",apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif',
    body:
      'Roboto,Oxygen-Sans,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif',
  },
  boxShadow: {
    hover: "0px 10px 25px rgba(50, 50, 50, 0.1)",
  },
  borderRadius: {
    button: 10,
    checkbox: 5,
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

export default constants;
