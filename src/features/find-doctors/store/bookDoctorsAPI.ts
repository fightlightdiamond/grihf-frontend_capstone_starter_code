import { createAsyncThunk } from '@reduxjs/toolkit';
import type { TDoctor, FindDoctorsError, IBookDoctor } from '../types';
import {
  _bookDoctor,
  _cancelBookDoctor,
  _findDoctors,
  _getBookDoctors,
} from '../mock/_DATA_';
import { DoctorSpecialty } from '../enum';

export const findDoctorsAPI = createAsyncThunk<
  TDoctor[],
  DoctorSpecialty,
  { rejectValue: FindDoctorsError }
>('findDoctors/fetch', async (specialty: DoctorSpecialty, thunkApi) => {
  const response = await _findDoctors(specialty);
  console.log('response', response);
  // Check if status is not okay:
  if (!response) {
    // Return the error message:
    return thunkApi.rejectWithValue({
      message: 'Failed to fetch bestServices.',
    });
  }
  return response;
});

export const getBookDoctorsAPI = createAsyncThunk<
  IBookDoctor[],
  number,
  { rejectValue: FindDoctorsError }
>('getBookDoctor/fetch', async (userId: number, thunkApi) => {
  const response = await _getBookDoctors(userId);

  // Check if status is not okay:
  if (!response) {
    // Return the error message:
    return thunkApi.rejectWithValue({
      message: 'Failed to fetch bestServices.',
    });
  }
  return response;
});

export const bookDoctorAPI = createAsyncThunk<
  IBookDoctor,
  IBookDoctor,
  { rejectValue: FindDoctorsError }
>('bookDoctor/fetch', async (bookDoctor: IBookDoctor, thunkApi) => {
  // const response = await _bookDoctor(bookDoctor);
  const response = await _bookDoctor(bookDoctor);
  // Check if status is not okay:
  if (!response) {
    // Return the error message:
    return thunkApi.rejectWithValue({
      message: 'Failed to fetch bestServices.',
    });
  }
  return response;
});

export interface ICancelPayload {
  userId: number;
  doctorId: number;
}

export const cancelBookDoctor = createAsyncThunk<
  IBookDoctor[],
  ICancelPayload,
  { rejectValue: FindDoctorsError }
>('cancelBookDoctor/fetch', async (payload: ICancelPayload, thunkApi) => {
  console.log('payload', payload);
  const response = await _cancelBookDoctor(payload);
  console.log('response', response);
  // Check if status is not okay:
  if (!response) {
    // Return the error message:
    return thunkApi.rejectWithValue({
      message: 'Failed to fetch bestServices.',
    });
  }
  return response;
});
