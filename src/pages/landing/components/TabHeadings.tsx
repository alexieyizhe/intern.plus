import React from "react";
import { LandingTab } from "../constants";
import styled from "styled-components";
import { Text } from "src/components";
import copy from "../copy";

export interface TabHeadingProps {
  curTab: LandingTab;
  onTabClick: (newTab: LandingTab) => () => void;
}

const HeadingContainer = styled.div`
  margin-top: 48px;
  display: flex;
  overflow: scroll;
`;

const TabHeading = styled(Text).attrs({ variant: "heading2", role: "button" })<{
  isCurrentTab: boolean;
}>`
  margin-right: 1rem;

  transition: opacity 200ms;
  opacity: ${({ isCurrentTab }) => (isCurrentTab ? 1 : 0.5)};

  &:hover {
    opacity: 0.75;
    cursor: pointer;
  }
`;

const TabHeadings: React.FC<TabHeadingProps> = ({ curTab, onTabClick }) => (
  <HeadingContainer>
    {Object.entries(copy.sections).map(([landingTab, { heading }]) => (
      <TabHeading
        isCurrentTab={landingTab === curTab}
        onClick={onTabClick(landingTab as LandingTab)}
      >
        {heading}
      </TabHeading>
    ))}
  </HeadingContainer>
);

export default React.memo(TabHeadings);
