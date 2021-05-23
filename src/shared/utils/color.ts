/**
 * Utility methods for dealing with colors.
 */

export function hexToHSL(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)!; // eslint-disable-line @typescript-eslint/no-non-null-assertion

  let r = parseInt(result[1], 16);
  let g = parseInt(result[2], 16);
  let b = parseInt(result[3], 16);

  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h = 0,
    s,
    l = (max + min) / 2;

  // eslint-disable-next-line eqeqeq
  if (max == min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  s = s * 100;
  s = Math.round(s);
  l = l * 100;
  l = Math.round(l);
  h = Math.round(360 * h);

  const colorInHSL = "hsl(" + h + ", " + s + "%, " + l + "%)";
  return colorInHSL;
}

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
    : isDark
    ? "#fdfdfd"
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
    : isDark
    ? "#565656"
    : "#f1f1f1";
