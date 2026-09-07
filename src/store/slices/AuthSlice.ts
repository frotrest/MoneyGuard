import {
  createSlice,
  type PayloadAction,
  type UnknownAction,
} from '@reduxjs/toolkit';
import { loginThunk, registerThunk, logoutThunk } from '../async/AuthThunk';
export type NoticeType = 'success' | 'info' | 'warning' | 'error';

export interface UserAccount {
  name: string;
  email: string;
  password?: string;
}

interface AuthInterface {
  accounts: UserAccount[];
  isAuthenticated: boolean;
  currentUserName: string;
  loader: boolean;
  isAlert: string;
  alertType: NoticeType;
}

const getInitialAccounts = (): UserAccount[] => {
  const saved = localStorage.getItem('accounts');
  const lastReset = localStorage.getItem('accounts_lastReset');

  if (lastReset) {
    const diffDays = (Date.now() - Number(lastReset)) / (1000 * 60 * 60 * 24);
    if (diffDays >= 3) {
      localStorage.removeItem('accounts');
      localStorage.removeItem('currentUserEmail');
      localStorage.removeItem('currentUserName');
      localStorage.setItem('isLogin', 'false');
    }
  }

  return saved
    ? JSON.parse(saved)
    : [
        { name: 'Test', email: 'test@gmail.com', password: 'test' },
        { name: 'Admin', email: 'admin@gmail.com', password: 'admin' },
      ];
};

const initialState: AuthInterface = {
  accounts: getInitialAccounts(),
  isAuthenticated: localStorage.getItem('isLogin') === 'true',
  currentUserName: localStorage.getItem('currentUserName') || '',
  loader: false,
  isAlert: '',
  alertType: 'error',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsAlert: (state, action: PayloadAction<string>) => {
      state.isAlert = action.payload;
    },
    setAlertType: (state, action: PayloadAction<NoticeType>) => {
      state.alertType = action.payload;
    },
    clearAlert: (state) => {
      state.isAlert = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loader = false;
        state.isAuthenticated = true;
        state.currentUserName = action.payload.name;
        state.alertType = 'success';
        state.isAlert = "You've successfully logged into your account";

        localStorage.setItem('isLogin', 'true');
        localStorage.setItem('currentUserName', action.payload.name);
        localStorage.setItem('currentUserEmail', action.payload.email);
        localStorage.setItem('accounts_lastReset', String(Date.now()));
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.isAlert = (action.payload as string) ?? 'Login failed';
      })
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.loader = false;
        state.accounts.push(action.payload);
        state.alertType = 'success';
        state.isAlert = 'Account has been created successfully!';

        localStorage.setItem('accounts', JSON.stringify(state.accounts));
        localStorage.setItem('accounts_lastReset', String(Date.now()));
      })
      .addCase(registerThunk.rejected, (state, action) => {
        state.isAlert = (action.payload as string) ?? 'Registration failed';
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.currentUserName = '';
        state.alertType = 'success';
        state.isAlert = "You've successfully logged out";
        state.loader = false;

        localStorage.setItem('isLogin', 'false');
        localStorage.removeItem('currentUserName');
        localStorage.removeItem('currentUserEmail');
        localStorage.setItem('accounts', JSON.stringify(state.accounts));
      })
      .addMatcher(
        (action: UnknownAction): action is PayloadAction<string> =>
          action.type.startsWith('auth/') && action.type.endsWith('/pending'),
        (state) => {
          state.loader = true;
        }
      )
      .addMatcher(
        (action: UnknownAction): action is PayloadAction<string> =>
          action.type.startsWith('auth/') && action.type.endsWith('/rejected'),
        (state) => {
          state.loader = false;
          state.alertType = 'error';
        }
      );
  },
});

export const { setIsAlert, setAlertType, clearAlert } = authSlice.actions;
export default authSlice.reducer;
