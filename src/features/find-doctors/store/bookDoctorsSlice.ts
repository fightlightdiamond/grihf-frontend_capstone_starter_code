import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../../app/stores';
import {
  bookDoctorAPI,
  cancelBookDoctor,
  getBookDoctorsAPI,
} from './bookDoctorsAPI';
import type { TBookDoctorsState } from '../types';
import { EStatus } from '../../../common/abstracts/enums';

const initialState: TBookDoctorsState = {
  items: [],
  item: null,
  error: null,
  status: EStatus.idle,
};

export const bookDoctorsSlice = createSlice({
  name: 'bookDoctors',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(bookDoctorAPI.pending, (state) => {
      state.status = EStatus.loading;
      state.error = null;
    });
    builder.addCase(bookDoctorAPI.fulfilled, (state, { payload }) => {
      console.log('xxx', [...state.items], payload);
      state.item = payload;
      state.items = [...state.items, payload];
      state.status = EStatus.succeeded;
      console.log('yyyy', [...state.items]);
    });
    builder.addCase(bookDoctorAPI.rejected, (state) => {
      state.status = EStatus.failed;
    });

    builder.addCase(getBookDoctorsAPI.pending, (state) => {
      state.status = EStatus.loading;
      state.error = null;
    });
    builder.addCase(getBookDoctorsAPI.fulfilled, (state, { payload }) => {
      state.items = [...payload];
      state.status = EStatus.succeeded;
    });
    builder.addCase(getBookDoctorsAPI.rejected, (state) => {
      state.status = EStatus.failed;
    });

    builder.addCase(cancelBookDoctor.pending, (state) => {
      state.status = EStatus.loading;
      state.error = null;
    });
    builder.addCase(cancelBookDoctor.fulfilled, (state, { payload }) => {
      console.log('payload', payload);
      state.items = [...payload];
      state.status = EStatus.succeeded;
    });
    builder.addCase(cancelBookDoctor.rejected, (state) => {
      state.status = EStatus.failed;
    });
  },
});

export const selectBookDoctorStatus = (state: RootState) =>
  state.bookDoctors.status;
export const selectError = (state: RootState) => state.bookDoctors.error;
export const selectBookDoctors = (state: RootState) => state.bookDoctors.items;
export const selectBookDoctor = (state: RootState) => state.bookDoctors.item;
export const selectBookDoctorFetchStatus = (state: RootState) =>
  state.bookDoctors.status;
export default bookDoctorsSlice.reducer;
