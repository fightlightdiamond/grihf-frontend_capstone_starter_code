// This type describes the error object structure:
import {createAsyncThunk} from "@reduxjs/toolkit";
import {User, UsersError} from "./types";

export const fetchUser = createAsyncThunk<
    User,
    number,
    { rejectValue: UsersError }
>(
    "user/fetch",
    async (id: number, thunkApi) => {
        const response = await fetch(
            `https://jsonplaceholder.typicode.com/users/${id}`
        );

        // Check if status is not okay:
        if (response.status !== 200) {
            // Return the error message:
            return thunkApi.rejectWithValue({
                message: "Failed to fetch users."
            });
        }

        const data: User = await response.json();
        return data;
    }
);

export const fetchUsers = createAsyncThunk<
    User[],
    number,
    { rejectValue: UsersError }
>(
    "users/fetch",
    async (limit: number, thunkApi) => {
        const response = await fetch(
            `https://jsonplaceholder.typicode.com/users?limit=${limit}`
        );

        // Check if status is not okay:
        if (response.status !== 200) {
            // Return the error message:
            return thunkApi.rejectWithValue({
                message: "Failed to fetch users."
            });
        }

        const data: User[] = await response.json();
        return data;
    }
);