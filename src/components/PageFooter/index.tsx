import React from "react";
import styled from "styled-components";

import copy from "./copy";

import Link from "src/components/Link";
import Text from "src/components/Text";

/*******************************************************************
 *                  **Utility functions/constants**                *
 *******************************************************************/
export const FOOTER_HEIGHT = 200;

/*******************************************************************
 *                            **Styles**                           *
 *******************************************************************/
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
  cursor: pointer;
  opacity: 0.7;
  width: 30px;

  transition: opacity 100ms ease-out;
  &:hover,
  &:focus {
    opacity: 0.8;
  }

  ${({ theme }) => theme.mediaQueries.xlMobile`
    max-width: 20px;
  `}
`;

/*******************************************************************
 *                           **Component**                         *
 *******************************************************************/
const Footer = () => (
  <Container>
    <Logo
      src={copy.logo.src}
      alt={copy.logo.alt}
      role="button"
      tabIndex={0}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    />

    <Text className="subheading" variant="heading4">
      {copy.getSubtext()}
    </Text>

    {copy.sublinks.map(({ label, to, newTab }) => (
      <Link newTab={newTab} to={to} bare key={label}>
        <Text variant="body" color="textTertiary">
          {label}
        </Text>
      </Link>
    ))}
  </Container>
);

export default React.memo(Footer);
