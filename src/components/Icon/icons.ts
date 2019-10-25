import {
  EditIcon,
  XIcon,
  XSquareIcon,
  StarEmptyIcon,
  StarFilledIcon,
} from "src/assets";

export enum IconName {
  EDIT = "edit",
  X = "x",
  X_SQUARE = "x-square",
  STAR_EMPTY = "star-empty",
  STAR_FILLED = "star-filled",
}

export default {
  [IconName.EDIT]: EditIcon,
  [IconName.X]: XIcon,
  [IconName.X_SQUARE]: XSquareIcon,
  [IconName.STAR_EMPTY]: StarEmptyIcon,
  [IconName.STAR_FILLED]: StarFilledIcon,
};
