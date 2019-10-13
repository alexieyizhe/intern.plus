export interface IAction {
  type: ActionType;
  data: any;
}

export enum ActionType {
  RESET,
  ACTIVATE_EASTER_EGG,
  TOGGLE_DARK_MODE,
}
