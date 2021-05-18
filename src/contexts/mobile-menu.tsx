import React, { createContext, useContext, useCallback, useState } from "react";

export interface IMobileMenuState {
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
  setMobileMenuOpen: (open: boolean) => void;
}

const DEFAULT_STATE = {
  isMobileMenuOpen: false,
  toggleMobileMenu: () => {},
  setMobileMenuOpen: (_: boolean) => {},
};

export const MobileMenuContext: React.Context<IMobileMenuState> =
  createContext(DEFAULT_STATE);

export const MobileMenuContextProvider: React.FC = ({ children, ...rest }) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const toggleMobileMenu = useCallback(
    () => setMobileMenuOpen((prev) => !prev),
    []
  );

  const stateValue = {
    isMobileMenuOpen,
    setMobileMenuOpen,
    toggleMobileMenu,
  };

  return (
    <MobileMenuContext.Provider value={stateValue} {...rest}>
      {children}
    </MobileMenuContext.Provider>
  );
};

export const useMobileMenuContext = () => useContext(MobileMenuContext);
