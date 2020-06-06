import React, { createContext, useContext, useCallback, useState } from "react";

export interface IAddReviewModalState {
  isAddReviewModalOpen: boolean;
  toggleAddReviewModal: () => void;
  setAddReviewModalOpen: (open: boolean) => void;
}

const DEFAULT_STATE = {
  isAddReviewModalOpen: false,
  toggleAddReviewModal: () => {},
  setAddReviewModalOpen: (_: boolean) => {},
};

export const AddReviewModalContext: React.Context<IAddReviewModalState> = createContext(
  DEFAULT_STATE
);

export const AddReviewModalContextProvider: React.FC = ({
  children,
  ...rest
}) => {
  const [isAddReviewModalOpen, setAddReviewModalOpen] = useState(false);
  const toggleAddReviewModal = useCallback(
    () => setAddReviewModalOpen((prev) => !prev),
    []
  );

  const stateValue = {
    isAddReviewModalOpen,
    setAddReviewModalOpen,
    toggleAddReviewModal,
  };

  return (
    <AddReviewModalContext.Provider value={stateValue} {...rest}>
      {children}
    </AddReviewModalContext.Provider>
  );
};

export const useAddReviewModalContext = () => useContext(AddReviewModalContext);
