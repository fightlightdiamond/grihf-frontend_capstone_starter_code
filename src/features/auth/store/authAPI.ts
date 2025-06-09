import {createAsyncThunk} from "@reduxjs/toolkit";
import {_login} from "../mock/_DATA_";
import {TUser} from "../../../common/abstracts/types";
import {AuthsError, TLogin} from "../types";

export const login = createAsyncThunk<
    TUser,
    TLogin,
    { rejectValue: AuthsError }
>(
    "auth/login",
    async (account: TLogin, thunkApi) => {
        const response = await _login(account)

        // Check if status is not okay:
        if (!response) {
            // Return the error message:
            return thunkApi.rejectWithValue({
                message: "Failed to authenticate."
            });
        }

        localStorage.setItem('auth', JSON.stringify(response))

        return response
    }
);