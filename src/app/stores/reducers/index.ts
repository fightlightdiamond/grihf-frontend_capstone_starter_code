import {combineReducers} from "@reduxjs/toolkit";
import usersReducer from "../../../features/users/usersSlice";
import authReducer from "../../../features/auth/store/authSlice";
import bestServicesReducer from "../../../features/home/store/bestServicesSlice";
import findDoctorsReducer from "../../../features/find-doctors/store/findDoctorsSlice";
import bookDoctorsReducer from "../../../features/find-doctors/store/bookDoctorsSlice";

export * from './todo.reducer'
export * from './goal.reducer'

export const rootReducer = combineReducers({
    users: usersReducer,
    auth: authReducer,
    bestServices: bestServicesReducer,
    findDoctors: findDoctorsReducer,
    bookDoctors: bookDoctorsReducer,
});