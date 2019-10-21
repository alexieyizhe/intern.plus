import React from "react";

import { LogoPlus } from "src/assets";

const emojis = [
  { raw: "✨", label: "sparkles" },
  { raw: "☕️", label: "coffee" },
  { raw: "💛", label: "yellow-heart" },
];

export const EMAIL = "hello@intern.plus";
export const FEEDBACK_LINK = `mailto:${EMAIL}?subject=Feedback for intern.plus`;

export default {
  logo: {
    src: LogoPlus,
    alt: "Small intern.plus logo",
  },
  subtext: () => {
    const randomEmoji = emojis[Math.floor(Math.random() * 3)];

    return (
      <>
        built with{" "}
        <span role="img" aria-label={randomEmoji.label}>
          {randomEmoji.raw}
        </span>{" "}
        by alex
      </>
    );
  },
  sublinks: [
    {
      to: "https://github.com/alexieyizhe/intern.plus",
      label: "open source",
    },
    {
      to: FEEDBACK_LINK,
      label: "submit feedback",
    },
    {
      to: `mailto:${EMAIL}`,
      label: "get in touch",
    },
  ],
};
