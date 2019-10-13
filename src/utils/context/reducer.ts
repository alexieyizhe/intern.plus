import { ISiteState, DEFAULT_STATE } from "./state";
import { IAction, ActionType } from "./actions";

export interface IReducerDispatch {
  (state: ISiteState, action: IAction): ISiteState;
}

export const reducer: IReducerDispatch = (state, action) => {
  switch (action.type) {
    case ActionType.ACTIVATE_EASTER_EGG:
      return {
        ...state,
        easterEggActive: !state.easterEggActive,
      };

    case ActionType.RESET:
      return DEFAULT_STATE;

    default:
      return state;
  }
};
