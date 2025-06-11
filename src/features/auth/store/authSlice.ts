import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../../app/stores';
import type { TAuthState, TError } from '../types';
import { login, signup } from './authAPI';
import type {
  TUser,
  ValidationErrorResponse,
} from '../../../common/abstracts/types';
import { EStatus } from '../../../common/abstracts/enums';

const initialState: TAuthState = {
  auth: (() => {
    const storedAuth = localStorage.getItem('auth');
    try {
      return storedAuth ? (JSON.parse(storedAuth) as TUser) : null;
    } catch {
      console.error('Invalid auth data in localStorage');
      return null;
    }
  })(),
  error: null,
  errors: [],
  status: EStatus.idle,
};

export function parsePayloadError(payload: unknown): {
  error: string;
  errors: ValidationErrorResponse;
} {
  if (typeof (payload as TError)?.message === 'string') {
    return { error: (payload as TError).message, errors: [] };
  }

  if (Array.isArray(payload) && typeof payload[0]?.msg === 'string') {
    return { error: '', errors: payload as ValidationErrorResponse };
  }

  return { error: 'Lỗi không xác định', errors: [] };
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state: TAuthState) => {
      localStorage.removeItem('auth');
      state.auth = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.status = EStatus.loading;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.auth = payload;
      state.status = EStatus.idle;
    });
    builder.addCase(login.rejected, (state, { payload }) => {
      const { error, errors } = parsePayloadError(payload);
      state.error = error;
      state.errors = errors;
    });

    //signup
    builder.addCase(signup.pending, (state) => {
      state.status = EStatus.loading;
      state.error = null;
    });
    builder.addCase(signup.fulfilled, (state, { payload }) => {
      state.auth = payload;
      state.status = EStatus.idle;
    });
    builder.addCase(signup.rejected, (state, { payload }) => {
      const { error, errors } = parsePayloadError(payload);
      state.error = error;
      state.errors = errors;
    });
  },
});

export const { logout } = authSlice.actions;

export const selectStatus = (state: RootState) => state.auth.status;
export const selectError = (state: RootState) => state.auth.error;
export const selectErrors = (state: RootState) => state.auth.errors;
export const selectAuth = (state: RootState) => state.auth.auth;
export default authSlice.reducer;
