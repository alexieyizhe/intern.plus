import React from "react";

import { Text } from "src/components";

const LandingPage = () => {
  return (
    <div>
      <div>TEXT</div>
      <Text variant="heading1" as="div">
        Heading 1
      </Text>
      <Text variant="heading2" as="div">
        Heading 2
      </Text>
      <Text variant="heading3" as="div">
        Heading 3
      </Text>
      <Text variant="heading4" as="div">
        Heading 4
      </Text>
      <Text variant="subheading" as="div">
        Subheading
      </Text>
      <Text variant="body" as="div">
        Body text
      </Text>
      <Text variant="body" italic as="div">
        Italicized body text
      </Text>
    </div>
  );
};

export default LandingPage;
