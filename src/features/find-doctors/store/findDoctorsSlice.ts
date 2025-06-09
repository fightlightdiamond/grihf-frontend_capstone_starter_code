import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../../app/stores";
import {findDoctorsAPI} from "./findDoctorsAPI";
import {TFindDoctorsState} from "../types";
import {EStatus} from "../../../common/abstracts/enums";

const initialState: TFindDoctorsState = {
    items: [],
    item: null,
    error: null,
    status: EStatus.idle,
};

export const findDoctorsSlice = createSlice({
    name: "findDoctors",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(findDoctorsAPI.pending, (state) => {
            state.status = EStatus.loading;
            state.error = null;
        });
        builder.addCase(findDoctorsAPI.fulfilled,
            (state, { payload }) => {
                state.items = payload;
                state.status = EStatus.idle;
            });
        builder.addCase(findDoctorsAPI.rejected,
            (state, { payload }) => {
                state.status = EStatus.failed;
            });
    },
});

export const selectStatus = (state: RootState) => state.findDoctors.status;
export const selectError = (state: RootState) => state.findDoctors.error;
export const selectFindDoctors = (state: RootState) => state.findDoctors.items;
export const selectFindDoctorFetchStatus = (state: RootState) => state.findDoctors.status
export default findDoctorsSlice.reducer;
