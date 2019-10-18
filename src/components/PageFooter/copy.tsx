import React from "react";

import { LogoTwoTone } from "src/assets";

const emojis = [
  { raw: "✨", label: "sparkles" },
  { raw: "☕️", label: "coffee" },
  { raw: "💛", label: "yellow-heart" },
];

export default {
  logo: {
    src: LogoTwoTone,
    alt: "An icon depicting a tugboat",
  },
  subtext: () => {
    const randomEmoji = emojis[Math.floor(Math.random() * 3)];

    return (
      <>
        Built with{" "}
        <span role="img" aria-label={randomEmoji.label}>
          {randomEmoji.raw}
        </span>{" "}
        by Alex Xie
      </>
    );
  },
  sourceCode: {
    to: "https://github.com/alexieyizhe/tugboat",
    label: "source code",
  },
  reportIssue: {
    to:
      "https://github.com/alexieyizhe/tugboat/issues/new?assignee=alexieyizhe&labels=bug&title=%20Something's%20wrong&body=Describe%20the%20problem%20you%27re%20having!",
    label: "report an issue",
  },
};
