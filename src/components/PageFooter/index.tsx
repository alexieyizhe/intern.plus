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

  & > .subheading {
    margin: 10px auto 5px auto;
  }
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
    <Text className="subheading" variant="subheading">
      Made with{" "}
      <span role="img" aria-label="sparkles">
        ✨
      </span>
      by Alex Xie
    </Text>
    <Link newTab to="https://github.com/alexieyizhe/tugboat" color="" bare>
      <Text variant="body" color="greyMedium">
        source code
      </Text>
    </Link>
    <Link
      newTab
      to="https://github.com/alexieyizhe/tugboat/issues/new?assignee=alexieyizhe&labels=bug&title=Issue:%20ISSUE_TITLE&body=Describe%20the%20problem%20you%27re%20having!"
      color=""
      bare
    >
      <Text variant="body" color="greyMedium">
        report an issue
      </Text>
    </Link>
  </Container>
);

export default Footer;
