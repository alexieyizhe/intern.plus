import React from "react";
import styled from "styled-components";

import { Text } from "src/components";

export interface ISectionProps {
  heading?: string;
}

const Container = styled.div`
  min-width: 40%;
  margin: 10px 10% 50px 0;

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
      <Text variant="heading2" as="h2" color="greyDark">
        {heading}
      </Text>
    )}
    {children}
  </Container>
);

export default Section;
