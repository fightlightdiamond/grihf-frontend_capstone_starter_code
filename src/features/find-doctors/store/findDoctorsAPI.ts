import {createAsyncThunk} from "@reduxjs/toolkit";
import {
    TDoctor,
    FindDoctorsError,
} from "../types";
import {_findDoctors} from "../mock/_DATA_";
import {DoctorSpecialty} from "../enum";

export const findDoctorsAPI = createAsyncThunk<
    TDoctor[],
    DoctorSpecialty,
    { rejectValue: FindDoctorsError }
>(
    "findDoctors/fetch",
    async (specialty: DoctorSpecialty, thunkApi) => {
        const response = await _findDoctors(specialty)
        console.log('response', response)
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
