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

export const getDarkColor = (hslString?: string) =>
  hslString ? changeColorLightness(hslString, 42) : "#333333";

export const getLightColor = (hslString?: string) =>
  hslString ? changeColorLightness(hslString, 90) : "#f1f1f1";
