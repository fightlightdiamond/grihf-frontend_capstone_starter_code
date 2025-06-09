import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../../app/stores";
import {TAuthState} from "../types";
import {login} from "./authAPI";
import {TUser} from "../../../common/abstracts/types";
import {EStatus} from "../../../common/abstracts/enums";

const initialState: TAuthState = {
    auth: (() => {
        const storedAuth = localStorage.getItem('auth');
        try {
            return storedAuth ? (JSON.parse(storedAuth) as TUser) : null;
        } catch {
            console.error("Invalid auth data in localStorage");
            return null;
        }
    })(),
    error: null,
    status: EStatus.idle,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state: TAuthState) => {
            localStorage.removeItem('auth');
            state.auth = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state) => {
            state.status = EStatus.loading;
            state.error = null;
        });
        builder.addCase(login.fulfilled,
            (state, { payload }) => {
                state.auth = payload;
                state.status = EStatus.idle;
            });
        builder.addCase(login.rejected,
            (state, { payload }) => {
                state.status = EStatus.failed;
                state.error = payload?.message + '';
            });
    },
});

export const {logout} = authSlice.actions

export const selectStatus = (state: RootState) =>
    state.auth.status;
export const selectError = (state: RootState) =>
    state.auth.error;
export const selectAuth = (state: RootState) => state.auth.auth;
export default authSlice.reducer;
