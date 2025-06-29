import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../app/stores';
import type { PayloadAction, ThunkDispatch } from '@reduxjs/toolkit';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<
  AppDispatch & ThunkDispatch<RootState, null, PayloadAction>
>();
export const useAppSelector = useSelector.withTypes<RootState>();
