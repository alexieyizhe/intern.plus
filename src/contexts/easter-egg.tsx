import React, { createContext, useContext, useCallback, useState } from "react";

export interface IEasterEggState {
  isEasterEggActive: boolean;
  toggleEasterEgg: () => void;
  setEasterEggActive: (active: boolean) => void;
}

const DEFAULT_STATE = {
  isEasterEggActive: false,
  toggleEasterEgg: () => {},
  setEasterEggActive: (_: boolean) => {},
};

export const EasterEggContext: React.Context<IEasterEggState> =
  createContext(DEFAULT_STATE);

export const EasterEggContextProvider: React.FC = ({ children, ...rest }) => {
  const [isEasterEggActive, setEasterEggActive] = useState(false);
  const toggleEasterEgg = useCallback(
    () => setEasterEggActive((prev) => !prev),
    []
  );

  const stateValue = {
    isEasterEggActive,
    setEasterEggActive,
    toggleEasterEgg,
  };

  return (
    <EasterEggContext.Provider value={stateValue} {...rest}>
      {children}
    </EasterEggContext.Provider>
  );
};

export const useEasterEggContext = () => useContext(EasterEggContext);
