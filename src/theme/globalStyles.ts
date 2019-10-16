import { createGlobalStyle } from "styled-components";

import { SharpSansBold } from "src/assets";

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: "Sharp Sans";
    font-weight: bold;
    src: url(${SharpSansBold});
  }

  html, body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  *, *:before, *:after {
    box-sizing: inherit;
  }
`;

export default GlobalStyles;
