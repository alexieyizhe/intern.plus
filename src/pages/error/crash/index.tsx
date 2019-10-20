import React from "react";
import styled from "styled-components";
import { Ghost } from "react-kawaii";

import { Text, Link } from "src/components";
import copy from "src/components/PageFooter/copy";

const Contents = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;

  & > div {
    margin-left: 40px;
    max-width: 300px;
  }
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
  <Contents>
    <FloatingGhost size={240} mood="ko" color="#E0E4E8" />
    <div>
      <Text variant="heading1" as="div">
        Yikes! Something went wrong.
      </Text>
      <Text variant="subheading" color="greyDark" as="div" size={20}>
        If you have the time, please{" "}
        <Link to={copy.reportIssue.to}>report the issue</Link> you encountered.
        Thank you!
      </Text>
    </div>
  </Contents>
);

export default CrashPage;
