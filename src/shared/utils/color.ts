/**
 * Utility methods for dealing with colors.
 */
export const changeColorLightness = (hslString: string, newLum: number) => {
  const [h, s] = hslString.replace(/[^\d.,]/g, "").split(",");

  return `hsl(${h}, ${s}%, ${newLum}%)`;
};

export const getDarkColor = (hslString?: string) =>
  hslString ? changeColorLightness(hslString, 42) : "#000";

export const getLightColor = (hslString?: string) =>
  hslString ? changeColorLightness(hslString, 90) : "#000";
