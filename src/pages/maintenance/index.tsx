import React from "react";
import styled from "styled-components";

import { MaintenanceGif } from "src/assets";

import { PageContainer, Text } from "src/components";

/*******************************************************************
 *                            **Styles**                           *
 *******************************************************************/
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
    line-height: 1.3;

    & h1 {
      margin-bottom: 6px;
    }
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

const Image = styled.img``;

/*******************************************************************
 *                           **Component**                         *
 *******************************************************************/
const DownForMaintenance = () => (
  <PageContainer>
    <Contents>
      <Image src={MaintenanceGif} />
      <div className="textContainer">
        <Text variant="heading1" as="h1">
          Excuse the construction.
        </Text>
        <Text variant="subheading" color="textSecondary" as="div" size={20}>
          The site is unavailable due to maintenance.
        </Text>
      </div>
    </Contents>
  </PageContainer>
);

export default DownForMaintenance;
