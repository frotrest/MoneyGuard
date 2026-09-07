import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type ExpenseType = '+' | '-';

interface ModalInterface {
  isOpen: boolean;
  type: ExpenseType;
}

const initialState: ModalInterface = {
  isOpen: false,
  type: '+',
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    toggleType: (state) => {
      state.type = state.type === '+' ? '-' : '+';
    },
    setType: (state, action: PayloadAction<ExpenseType>) => {
      state.type = action.payload;
    },
    openModal: (state, action: PayloadAction<ExpenseType | undefined>) => {
      state.isOpen = true;
      if (action.payload) {
        state.type = action.payload;
      }
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
  },
});

export const { toggleType, setType, openModal, closeModal } =
  modalSlice.actions;

export default modalSlice.reducer;
