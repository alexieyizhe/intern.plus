import {
  EditIcon,
  XIcon,
  XSquareIcon,
  StarEmptyIcon,
  StarFilledIcon,
  ExternalLinkIcon,
} from "src/assets";

export enum IconName {
  EDIT = "edit",
  X = "x",
  X_SQUARE = "x-square",
  STAR_EMPTY = "star-empty",
  STAR_FILLED = "star-filled",
  EXTERNAL_LINK = "external-link",
}

export default {
  [IconName.EDIT]: EditIcon,
  [IconName.X]: XIcon,
  [IconName.X_SQUARE]: XSquareIcon,
  [IconName.STAR_EMPTY]: StarEmptyIcon,
  [IconName.STAR_FILLED]: StarFilledIcon,
  [IconName.EXTERNAL_LINK]: ExternalLinkIcon,
};
