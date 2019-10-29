export interface ISiteState {
  mobileMenuOpen: boolean;
  addReviewModalOpen: boolean;
  easterEggActive: boolean;
  darkModeActive: boolean;
}

export const DEFAULT_STATE: ISiteState = {
  mobileMenuOpen: false,
  addReviewModalOpen: false,
  easterEggActive: false,
  darkModeActive: false,
};
