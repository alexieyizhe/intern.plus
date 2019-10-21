import React from "react";
import styled from "styled-components";
import { Ghost } from "react-kawaii";

import { PageContainer, Text, Link } from "src/components";
import { FEEDBACK_LINK } from "src/components/PageFooter/copy";

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

const CrashPage = () => (
  <PageContainer>
    <Contents>
      <FloatingGhost size={240} mood="ko" color="#E0E4E8" />
      <div className="textContainer">
        <Text variant="heading1" as="h1">
          Yikes! Something went wrong.
        </Text>
        <Text variant="subheading" color="greyDark" as="div" size={20}>
          If you have the time, please{" "}
          <Link to={FEEDBACK_LINK}>report the issue</Link> you encountered.
          Thank you!
        </Text>
      </div>
    </Contents>
  </PageContainer>
);

export default CrashPage;
