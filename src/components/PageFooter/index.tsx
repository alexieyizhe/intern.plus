import React from "react";
import styled from "styled-components";

import Link from "src/components/Link";
import Text from "src/components/Text";

export const FOOTER_HEIGHT = 140;

const Container = styled.footer`
  position: relative;
  width: 100%;
  height: ${FOOTER_HEIGHT}px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Logo = styled.img`
  max-width: 50px;
`;

const Footer = () => (
  <Container>
    <Logo
      src="https://cdn0.iconfinder.com/data/icons/travel-and-destination-1/64/port-boat-ship-tugboat-nautical-sailing-512.png"
      alt="An icon depicting a tugboat"
    />
    <Text variant="subheading">
      Made with{" "}
      <span role="img" aria-label="sparkles">
        ✨
      </span>
      by Alex Xie
    </Text>
    <Link newTab to="https://github.com/alexieyizhe/tugboat" color="" bare>
      <Text variant="body" color="greyMedium">
        Source Code
      </Text>
    </Link>
  </Container>
);

export default Footer;
