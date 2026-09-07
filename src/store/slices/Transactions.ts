import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ExpenseType } from './ModalSlice';
import { loginThunk, logoutThunk } from '../async/AuthThunk';

export type CategoryType =
  | 'Main expenses'
  | 'Products'
  | 'Car'
  | 'Self care'
  | 'Child care'
  | 'Family products'
  | 'Education'
  | 'Leisure'
  | 'Other expenses'
  | 'Entertainment'
  | 'Income'
  | 'Other';

export interface Transaction {
  readonly id: string;
  date: string;
  type: ExpenseType;
  category: CategoryType | string;
  comment: string;
  sum: number | string;
}

interface TransactionsState {
  items: Transaction[];
}

const defaultTransactions: Transaction[] = [
  {
    id: '1',
    date: '04.01.19',
    type: '-',
    category: 'Other',
    comment: 'Gift for wife',
    sum: 300,
  },
  {
    id: '2',
    date: '05.01.19',
    type: '+',
    category: 'Income',
    comment: 'January bonus',
    sum: 8000,
  },
];

const getInitialTransactions = (): Transaction[] => {
  const currentUserEmail = localStorage.getItem('currentUserEmail') || 'guest';
  const saved = localStorage.getItem(`transactions_${currentUserEmail}`);
  return saved ? JSON.parse(saved) : defaultTransactions;
};

const saveToLocalStorage = (transactions: Transaction[]) => {
  const currentUserEmail = localStorage.getItem('currentUserEmail') || 'guest';
  localStorage.setItem(
    `transactions_${currentUserEmail}`,
    JSON.stringify(transactions)
  );
};

const initialState: TransactionsState = {
  items: getInitialTransactions(),
};

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      state.items.push(action.payload);
      saveToLocalStorage(state.items);
    },
    deleteTransaction: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      saveToLocalStorage(state.items);
    },
    editTransaction: (
      state,
      action: PayloadAction<{ index: number; transaction: Transaction }>
    ) => {
      const { index, transaction } = action.payload;
      if (index >= 0 && index < state.items.length) {
        state.items[index] = transaction;
        saveToLocalStorage(state.items);
      }
    },
    setTransactions: (state, action: PayloadAction<Transaction[]>) => {
      state.items = action.payload;
      saveToLocalStorage(state.items);
    },
    loadUserTransactions: (state) => {
      state.items = getInitialTransactions();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.fulfilled, (state, action) => {
        const email = action.payload.email;
        const saved = localStorage.getItem(`transactions_${email}`);
        state.items = saved ? JSON.parse(saved) : defaultTransactions;
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.items = getInitialTransactions();
      });
  },
});

export const {
  addTransaction,
  deleteTransaction,
  editTransaction,
  setTransactions,
  loadUserTransactions,
} = transactionsSlice.actions;

export default transactionsSlice.reducer;
