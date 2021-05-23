import React from "react";

import { RouteName } from "src/shared/constants/routing";
import { Link } from "..";

const emojis = [
  { raw: "✨", label: "sparkles" },
  { raw: "☕️", label: "coffee" },
  { raw: "💛", label: "yellow-heart" },
  { raw: "🌻", label: "sunflower" },
];

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
      by{" "}
      <Link to="https://alex.xie.codes/" newTab>
        alex
      </Link>
    </>
  );
};

export const EMAIL = "hello@intern.plus";
export const FEEDBACK_LINK =
  "https://github.com/alexieyizhe/intern.plus/issues/new?title=Feedback%20for%20intern.plus&body=Explain%20your%20issue%20here";

const COPY = {
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

export default COPY;
