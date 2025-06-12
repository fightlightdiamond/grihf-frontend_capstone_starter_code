import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../../app/stores';
import { fetchBestService, fetchBestServices } from './bestServicesAPI';
import type { TBestServicesState } from '../types';
import { EStatus } from '../../../common/abstracts/enums';

const initialState: TBestServicesState = {
  bestServices: [],
  bestService: null,
  error: null,
  status: EStatus.idle,
};

export const bestServicesSlice = createSlice({
  name: 'bestServices',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBestService.pending, (state) => {
      state.status = EStatus.loading;
      state.error = null;
    });
    builder.addCase(fetchBestService.fulfilled, (state, { payload }) => {
      state.bestService = payload;
      state.status = EStatus.idle;
    });
    builder.addCase(fetchBestService.rejected, (state) => {
      state.status = EStatus.failed;
    });
    builder.addCase(fetchBestServices.pending, (state) => {
      state.status = EStatus.loading;
      state.error = null;
    });
    builder.addCase(fetchBestServices.fulfilled, (state, { payload }) => {
      state.bestServices = payload;
      state.status = EStatus.idle;
    });
    builder.addCase(fetchBestServices.rejected, (state) => {
      state.status = EStatus.failed;
    });
  },
});

export const selectStatus = (state: RootState) => state.bestServices.status;
export const selectError = (state: RootState) => state.bestServices.error;
export const selectBestServices = (state: RootState) =>
  state.bestServices.bestServices;
export const selectBestService = (state: RootState) =>
  state.bestServices.bestService;
export const selectBestServiceFetchStatus = (state: RootState) =>
  state.bestServices.status;
export default bestServicesSlice.reducer;
