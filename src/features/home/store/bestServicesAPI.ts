import {createAsyncThunk} from "@reduxjs/toolkit";
import {
    TBestService,
    BestServicesError,
} from "../types";
import {_getBestService, _getBestServices} from "../mock/_DATA_";

export const fetchBestService = createAsyncThunk<
    TBestService,
    number,
    { rejectValue: BestServicesError }
>(
    "bestService/fetch",
    async (id: number, thunkApi) => {
        const response = await _getBestService(id)

        // Check if status is not okay:
        if (!response) {
            // Return the error message:
            return thunkApi.rejectWithValue({
                message: "Failed to fetch bestServices."
            });
        }

        return response
    }
);

export const fetchBestServices = createAsyncThunk<
    TBestService[],
    number,
    { rejectValue: BestServicesError }
>(
    "bestServices/fetch",
    async (limit: number, thunkApi) => {
        const response = await _getBestServices()

        console.log('-----', response)

        // Check if status is not okay:
        if (!response) {
            // Return the error message:
            return thunkApi.rejectWithValue({
                message: "Failed to fetch bestServices."
            });
        }

        return response
    }
);
