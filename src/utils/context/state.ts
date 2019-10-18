export interface ISiteState {
  mobileMenuOpen: boolean;
  easterEggActive: boolean;
  darkModeActive: boolean;
}

export const DEFAULT_STATE: ISiteState = {
  mobileMenuOpen: false,
  easterEggActive: false,
  darkModeActive: false,
};
