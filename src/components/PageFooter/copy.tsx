import React from "react";

import { LogoSmall } from "src/assets";
import { RouteName } from "src/utils/constants";

const emojis = [
  { raw: "✨", label: "sparkles" },
  { raw: "☕️", label: "coffee" },
  { raw: "💛", label: "yellow-heart" },
];

const RANKINGS_DAY1 = "11/5";
const RANKINGS_DAY2 = "11/5";
const RANKINGS_TEXT = "thank mr goose for rankings";

const getSubtext = () => {
  const dateStr = `${new Date().getMonth() + 1}/${new Date().getDate()}`;

  switch (dateStr) {
    case "10/31":
      return (
        <>
          happy halloween{" "}
          <span role="img" aria-label="jack-o-lantern">
            🎃
          </span>
        </>
      );

    case "12/25":
      return (
        <>
          ho ho ho{" "}
          <span role="img" aria-label="christmas-tree">
            🎄
          </span>
        </>
      );
    case "1/1":
      return (
        <>
          happy new year{" "}
          <span role="img" aria-label="christmas-tree">
            🎊
          </span>
        </>
      );

    case RANKINGS_DAY1:
      return <>{RANKINGS_TEXT}</>;

    case RANKINGS_DAY2:
      return <>{RANKINGS_TEXT}</>;
  }

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
};

export const EMAIL = "hello@intern.plus";
// export const FEEDBACK_LINK = `mailto:${EMAIL}?subject=Feedback for intern.plus`;
export const FEEDBACK_LINK =
  "https://github.com/alexieyizhe/intern.plus/issues/new?title=Feedback%20for%20intern.plus&body=Explain%20your%20issue%20here";

export default {
  logo: {
    src: LogoSmall,
    alt: "Small intern.plus logo",
  },
  getSubtext,
  sublinks: [
    {
      to: `mailto:${EMAIL}`,
      label: "get in touch",
      newTab: false,
    },
    {
      to: FEEDBACK_LINK,
      label: "submit feedback",
      newTab: true,
    },

    {
      to: "https://github.com/alexieyizhe/intern.plus",
      label: "open source",
      newTab: true,
    },
    {
      to: RouteName.DESIGN,
      label: "design system",
      newTab: false,
    },
  ],
};
