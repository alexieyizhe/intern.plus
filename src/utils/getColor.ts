import Vibrant from "node-vibrant";

export const changeColorLightness = (hslString: string, newLum: number) => {
  const [h, s] = hslString.replace(/[^\d.,]/g, "").split(",");

  return `hsl(${h}, ${s}%, ${newLum}%)`;
};
export const getDarkColor = (hslString: string) =>
  changeColorLightness(hslString, 42);
export const getLightColor = (hslString: string) =>
  changeColorLightness(hslString, 90);

export const getLightColorFromImg = async (
  imgSrc: string,
  fallbackColor: string
) => {
  try {
    const palette = await Vibrant.from(imgSrc).getPalette();
    const bestFitSwatch = palette
      ? palette.LightVibrant ||
        palette.Vibrant ||
        palette.DarkVibrant ||
        palette.LightMuted ||
        palette.Muted ||
        palette.DarkMuted
      : null;

    console.log(bestFitSwatch);

    if (bestFitSwatch) {
      const [h, s, l] = bestFitSwatch.getHsl();
      return `hsl(${h * 360}, ${s * 100}%, ${l * 100}%)`; // set lightness to high bc background
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
