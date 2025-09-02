import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModalState {
  isOpen: boolean;
  modalType?: string;
  modalProps?: Record<string, string | undefined>;
}

const initialModalState: ModalState = {
  isOpen: false,
  modalType: undefined,
  modalProps: undefined,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState: initialModalState,
  reducers: {
    openModal: (
      state,
      action: PayloadAction<{
        modalType: string;
        modalProps?: Record<string, string | undefined>;
      }>,
    ) => {
      state.isOpen = true;
      state.modalType = action.payload.modalType;
      state.modalProps = action.payload?.modalProps;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.modalType = undefined;
      state.modalProps = undefined;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
