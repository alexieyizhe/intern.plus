import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Redirect } from "react-router-dom";
import { Ghost } from "react-kawaii";

import { RouteName } from "src/utils/constants";

import { PageContainer, Text } from "src/components";

const Contents = styled.div`
  position: relative;
  width: 100%;
  min-height: 600px;

  display: flex;
  justify-content: center;
  align-items: center;

  & > div.textContainer {
    margin-left: 50px;
    max-width: 300px;
  }

  ${({ theme }) => theme.mediaQueries.tablet`
    flex-direction: column;
    text-align: center;
    min-height: 450px;

    & > div.textContainer {
      margin-top: 60px;
      margin-left: 0;

      & h1 {
        font-size: 26px;
      }
    }
  `}
`;

const FloatingGhost = styled(Ghost)`
  &::after {
    content: "";
    display: block;
    position: absolute;
    bottom: -30px;
    left: 50%;
    height: 12px;
    width: 85%;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.4);
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.2);
    opacity: 0.3;

    transform: translate(-50%, 0);
    transition: transform 1s;
  }
`;

const NotFoundPage = () => {
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShouldRedirect(true), 4000);
    return () => clearTimeout(timer);
  });

  if (shouldRedirect) return <Redirect to={RouteName.LANDING} />;

  return (
    <PageContainer>
      <Contents>
        <FloatingGhost size={240} mood="shocked" color="#E0E4E8" />
        <div className="textContainer">
          <Text variant="heading1" as="h1">
            This page doesn't exist. Spooky!
          </Text>
          <Text variant="subheading" color="greyDark" as="div" size={20}>
            You'll be redirected to somewhere safe shortly.
          </Text>
        </div>
      </Contents>
    </PageContainer>
  );
};

export default NotFoundPage;
