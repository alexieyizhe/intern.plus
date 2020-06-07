/**
 * Utility methods for dealing with colors.
 */

export const strToHSL = (string: string) => {
  let hash = 0;
  if (string.length !== 0) {
    for (let i = 0; i < string.length; i++) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
      hash = hash & hash; // Convert to 32bit integer
    }
  }

  const shortened = hash % 360;

  return "hsl(" + shortened + ",100%,30%)";
};

export const changeColorLightness = (hslString: string, newLum: number) => {
  const [h, s] = hslString.replace(/[^\d.,]/g, "").split(",");

  return `hsl(${h}, ${s}%, ${newLum}%)`;
};

export const changeColorSaturation = (hslString: string, newSat: number) => {
  const [h, , l] = hslString.replace(/[^\d.,]/g, "").split(",");

  return `hsl(${h}, ${newSat}%, ${l}%)`;
};

/**
 * Returns a shade of `hslString` that's close to the current
 * textPrimary text color.
 */
export const getPrimaryColor = (isDark: boolean, hslString?: string) =>
  hslString
    ? isDark
      ? changeColorLightness(changeColorSaturation(hslString, 75), 80)
      : changeColorLightness(hslString, 45)
    : "#333333";

/**
 * Returns a shade of `hslString` that's close to the current
 * backgroundPrimary text color.
 */
export const getSecondaryColor = (isDark: boolean, hslString?: string) =>
  hslString
    ? isDark
      ? changeColorLightness(changeColorSaturation(hslString, 10), 30)
      : changeColorLightness(hslString, 90)
    : "#f1f1f1";
