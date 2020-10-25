import React from "react";

// import { RouteName } from "src/shared/constants/routing";

const emojis = [
  { raw: "✨", label: "sparkles" },
  { raw: "☕️", label: "coffee" },
  { raw: "💛", label: "yellow-heart" },
];

const RANKINGS_DAY1 = "11/5";
const RANKINGS_DAY2 = "11/5";
const RANKINGS_TEXT = "thank mr goose for rankings";

/**
 * Gets the correct text underneath the footer logo.
 */
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

  let randomEmoji = emojis[Math.floor(Math.random() * 3)];

  if (process.env.NODE_ENV !== "production") {
    // stabilize emoji for tests
    randomEmoji = emojis[0];
  }

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
export const FEEDBACK_LINK =
  "https://github.com/alexieyizhe/intern.plus/issues/new?title=Feedback%20for%20intern.plus&body=Explain%20your%20issue%20here";

export default {
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
    // {
    //   to: RouteName.DESIGN,
    //   label: "design system",
    //   newTab: false,
    // },
  ],
};
