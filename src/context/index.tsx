import React, { createContext, useContext, useReducer } from "react";

import { IAction } from "./actions";
import { reducer } from "./reducer";
import { ISiteState, DEFAULT_STATE } from "./state";

export interface ISiteContext {
  state: ISiteState;
  dispatch: React.Dispatch<IAction>;
}

export const SiteContext: React.Context<ISiteContext> = createContext({
  state: DEFAULT_STATE,
  dispatch: (_) => {},
});

export const SiteContextProvider: React.FC = ({ children, ...rest }) => {
  const [state, dispatch] = useReducer(reducer, DEFAULT_STATE);

  return (
    <SiteContext.Provider value={{ state, dispatch }} {...rest}>
      {children}
    </SiteContext.Provider>
  );
};

export const useSiteContext = () => useContext(SiteContext);

export * from "./actions";
export * from "./reducer";
export * from "./state";
