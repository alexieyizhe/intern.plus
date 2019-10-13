import React from "react";

import { Card, Button, Link, Text, TextInput } from "src/components";

const LandingPage = () => (
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

    <div>BUTTON</div>
    <Button>
      <Text variant="body">Regular</Text>
    </Button>

    <Button color="#9e7fa3">
      <Text variant="body" color="white">
        Colored
      </Text>
    </Button>

    <Button disabled>
      <Text variant="body">Disabled</Text>
    </Button>

    <div>LINK</div>
    <Link to="">
      <Text variant="body" color="burlywood">
        Here's a link
      </Text>
    </Link>

    <div>TEXTINPUT</div>
    <TextInput color="greyLight" variant="body" />
    <TextInput color="greyLight" placeholder="Some placeholder text" />
    <TextInput color="greyLight" disabled />
    <TextInput
      color="greyLight"
      variant="heading2"
      placeholder="BIG heading2 input"
    />

    <div>CARD</div>
    <Card color="greyLight" onClick={() => console.log("clicked card")}>
      sup
    </Card>
  </div>
);

export default LandingPage;
