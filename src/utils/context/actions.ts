export interface IAction {
  type: ActionType;
  data?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export enum ActionType {
  RESET,
  CLOSE_MOBILE_MENU,
  TOGGLE_MOBILE_MENU,
  TOGGLE_EASTER_EGG,
  TOGGLE_DARK_MODE,
}
