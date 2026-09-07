import { createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '..';
import type { UserAccount } from '../slices/AuthSlice';

interface LoginType {
  email: string;
  password?: string;
}

interface RegisterType {
  name: string;
  email: string;
  password?: string;
}

type AsyncConfig = {
  state: RootState;
  rejectValue: string;
};

export const loginThunk = createAsyncThunk<UserAccount, LoginType, AsyncConfig>(
  'auth/login',
  async ({ email, password }, { getState, rejectWithValue }) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const { accounts } = getState().auth;

    const found = accounts.find(
      (user: UserAccount) => user.email === email && user.password === password
    );

    if (!found) {
      return rejectWithValue("Incorrect password or you've left empty fields!");
    }

    return found;
  }
);

export const registerThunk = createAsyncThunk<
  UserAccount,
  RegisterType,
  AsyncConfig
>(
  'auth/register',
  async ({ name, email, password }, { getState, rejectWithValue }) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const { accounts } = getState().auth;

    const exists = accounts.find(
      (user: UserAccount) => user.email === email || user.name === name
    );

    if (exists) {
      return rejectWithValue('Account with this email already exists!');
    }

    return { name, email, password };
  }
);

export const logoutThunk = createAsyncThunk<boolean, void, AsyncConfig>(
  'auth/logout',
  async () => {
    return true;
  }
);
