import { createAsyncThunk, type GetThunkAPI } from '@reduxjs/toolkit';
import type { TUser } from '../../../common/abstracts/types';
import type { AuthsError, TLogin, TRegister } from '../types';
import { API_URL } from '../../../config.ts';

async function returnData(
  response: Response,
  account: TLogin | TRegister,
  thunkApi: GetThunkAPI<unknown>,
) {
  const json = await response.json();

  if (json.authtoken) {
    // Store user data in session storage
    sessionStorage.setItem('auth-token', json.authtoken);
    sessionStorage.setItem('auth', JSON.stringify(account));
  } else if (json.errors) {
    return thunkApi.rejectWithValue(json.errors);
  } else if (json.error) {
    return thunkApi.rejectWithValue({
      message: json.error,
    });
  }

  return json;
}

export const login = createAsyncThunk<
  TUser,
  TLogin,
  { rejectValue: AuthsError }
>('auth/login', async (account: TLogin, thunkApi) => {
  // API Call to register user
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(account),
  });

  return await returnData(response, account, thunkApi);
});

export const signup = createAsyncThunk<
  TUser,
  TRegister,
  { rejectValue: AuthsError }
>('auth/signup', async (account: TRegister, thunkApi) => {
  // API Call to register user
  const response = await fetch(`${API_URL}/api/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(account),
  });

  return await returnData(response, account, thunkApi);
});
