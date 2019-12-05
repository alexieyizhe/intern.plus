import { strToHSL, getLightColor } from "src/shared/utils/color";

export const slugify = (str: string): string => {
  const a =
    "àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;";
  const b =
    "aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnooooooooprrsssssttuuuuuuuuuwxyyzzz------";
  const p = new RegExp(a.split("").join("|"), "g");

  return str
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w-]+/g, "") // Remove all non-word characters
    .replace(/--+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
};

const REVIEW_IS_NEW_THRESHOLD = 15_552_000_000; // 6 months in ms // 31536000000; // 1 year in ms

export const getReviewCardTags = (tags: string, date?: string) => [
  ...(date &&
  Number(new Date()) - Number(new Date(date)) < REVIEW_IS_NEW_THRESHOLD
    ? [{ label: "new", bgColor: "goldLight" }]
    : []),
  ...tags
    .split(",")
    .filter(t => !!t)
    .map(tagText => ({
      label: tagText,
      bgColor: getLightColor(strToHSL(tagText)),
    })),
];
