import { createAsyncThunk, type GetThunkAPI } from '@reduxjs/toolkit';
import type { TUser } from '../../../common/abstracts/types';
import type { AuthsError, TLogin, TRegister } from '../types';
import { API_URL } from '../../../config.ts';
import { _login } from '../mock/_DATA_.ts';

async function returnData(
  response: Response,
  account: TLogin | TRegister,
  thunkApi: GetThunkAPI<unknown>,
) {
  const json = await response.json();

  if (json.authtoken) {
    // Store user data in session storage
    localStorage.setItem('auth-token', json.authtoken);
    localStorage.setItem('auth', JSON.stringify(account));
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
  const response = await _login(account);

  // Check if status is not okay:
  if (!response) {
    // Return the error message:
    return thunkApi.rejectWithValue({
      message: 'Failed to authenticate.',
    });
  }
  localStorage.setItem('auth-token', '123');
  localStorage.setItem('auth', JSON.stringify(response));

  return response;
  //
  // // API Call to register user
  // const response = await fetch(`${API_URL}/api/auth/login`, {
  //     method: "POST",
  //     headers: {
  //         "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(account),
  // });
  //
  // return await returnData(response, account, thunkApi);
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
