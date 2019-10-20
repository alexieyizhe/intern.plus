import { useState, useEffect } from "react";

import { getLightColorFromImg, getDarkColorFromImg } from "src/utils/getColor";

/**
 * Computes a matching color from an image if possible.
 * Otherwise, use the default fallback.
 */
export const useComputedColor = (
  imgSrc: string,
  fallbackColor = "",
  background = false
) => {
  const [color, setColor] = useState("");
  useEffect(() => {
    const getColor = async () => {
      let color: string;

      if (background) {
        color = await getLightColorFromImg(imgSrc, fallbackColor);
      } else {
        color = await getDarkColorFromImg(imgSrc, fallbackColor);
      }

      setColor(color);
    };

    getColor();
  }, [background, fallbackColor, imgSrc]);

  return color;
};
