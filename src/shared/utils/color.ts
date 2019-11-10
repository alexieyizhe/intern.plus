/**
 * Utility methods for dealing with colors.
 */

import themeConstants from "src/theme/constants";

export const changeColorLightness = (hslString: string, newLum: number) => {
  const [h, s] = hslString.replace(/[^\d.,]/g, "").split(",");

  return `hsl(${h}, ${s}%, ${newLum}%)`;
};

export const getDarkColor = (hslString?: string) =>
  hslString
    ? changeColorLightness(hslString, 42)
    : (themeConstants.color.black as string);

export const getLightColor = (hslString?: string) =>
  hslString
    ? changeColorLightness(hslString, 90)
    : (themeConstants.color.greyLight as string);
