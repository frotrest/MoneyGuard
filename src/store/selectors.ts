import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '.';

export const selectModalType = (state: RootState) => state.modal.type;
export const selectIsModalOpen = (state: RootState) => state.modal.isOpen;

export const selectTransactions = (state: RootState) =>
  state.transactions.items;

export const selectCurrentUserName = (state: RootState) =>
  state.auth?.currentUserName;
export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;

export const selectIsAlert = (state: RootState) => state.auth.isAlert;

export const selectType = (state: RootState) => state.auth.alertType;

export const selectLoader = (state: RootState) => state.auth.loader;

export const selectTotalBalance = createSelector(
  [selectTransactions],
  (transactions) =>
    transactions.reduce((acc, item) => {
      const amount = Number(item.sum) || 0;
      return item.type === '+' ? acc + amount : acc - amount;
    }, 0)
);
