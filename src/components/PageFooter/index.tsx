import React from "react";
import styled from "styled-components";

import copy from "./copy";

import Link from "src/components/Link";
import Text from "src/components/Text";

export const FOOTER_HEIGHT = 140;

const Container = styled.footer`
  position: relative;
  width: 100%;
  height: ${FOOTER_HEIGHT}px;
  margin: 15px auto;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & > .subheading {
    margin: 10px auto 5px auto;
  }
`;

const Logo = styled.img`
  cursor: pointer;
  opacity: 0.7;
  max-width: 55px;

  transition: opacity 150ms ease-out;
  &:hover,
  &:focus {
    opacity: 0.8;
  }

  ${({ theme }) => theme.mediaQueries.xlMobile`
    max-width: 40px;
  `}
`;

const Footer = () => (
  <Container>
    <Logo
      src={copy.logo.src}
      alt={copy.logo.alt}
      role="button"
      tabIndex={0}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    />
    <Text className="subheading" variant="subheading">
      Built with{" "}
      <span role="img" aria-label="sparkles">
        ✨
      </span>
      by Alex Xie
    </Text>
    <Link newTab to={copy.sourceCode.to} color="" bare>
      <Text variant="body" color="greyMedium">
        {copy.sourceCode.label}
      </Text>
    </Link>
    <Link newTab to={copy.reportIssue.to} color="" bare>
      <Text variant="body" color="greyMedium">
        {copy.reportIssue.label}
      </Text>
    </Link>
  </Container>
);

export default React.memo(Footer);
