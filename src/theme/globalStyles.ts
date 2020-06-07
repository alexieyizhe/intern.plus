import { createGlobalStyle } from "styled-components";

import { SharpSansBold } from "src/assets";

export const HeadingFontDefinition = createGlobalStyle`
  @font-face {
    font-family: "Sharp Sans";
    font-weight: bold;
    src: url(${SharpSansBold});
  }
`;

const GlobalStyles = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background-color: ${({ theme }) => theme.color.backgroundPrimary};
  }
  
  body,
  body * {
    transition: background-color 200ms ease-in, color 200ms ease-in;
  }
  
  *, *:before, *:after {
    box-sizing: inherit;
  }

  *:focus:not(.focus-visible) {
    outline: none;
  }    
`;

export default GlobalStyles;
