import Vibrant from "node-vibrant";

export const getDarkColor = () => `hsl(${~~(360 * Math.random())}, 70%, 40%)`;

export const getLightColorFromImg = async (
  imgSrc: string,
  fallbackColor: string
) => {
  try {
    const palette = await Vibrant.from(imgSrc).getPalette();
    if (palette && palette.LightMuted) {
      const [h, s] = palette.LightMuted.getHsl();
      return `hsl(${h * 360}, ${s * 100}%, 85%)`; // set lightness to high bc background
    }
  } catch (e) {
    console.error(e);
  }

  return fallbackColor;
};

export const getDarkColorFromImg = async (
  imgSrc: string,
  fallbackColor: string
) => {
  try {
    const palette = await Vibrant.from(imgSrc).getPalette();
    if (palette && palette.LightMuted) {
      const [h, s] = palette.LightMuted.getHsl();
      return `hsl(${h * 360}, ${s * 100}%, 45%)`; // set lightness to high bc background
    }
  } catch (e) {
    console.error(e);
  }

  return fallbackColor;
};
