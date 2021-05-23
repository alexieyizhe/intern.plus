import React from "react";
import styled from "styled-components";

import { Text } from "src/components";

export interface ISectionProps {
  heading?: string;
}

const Container = styled.section`
  min-width: 40%;
  margin: 10px 5% 50px 0;

  display: inline-flex;
  flex-direction: column;

  & > * {
    margin-bottom: 30px;
  }

  & > h2 {
    margin-bottom: 10px;
  }
`;

const Section: React.FC<ISectionProps> = ({ heading, children, ...rest }) => (
  <Container {...rest}>
    {heading && (
      <Text variant="heading2" as="h2" color="textSecondary">
        {heading}
      </Text>
    )}
    {children}
  </Container>
);

export default Section;
