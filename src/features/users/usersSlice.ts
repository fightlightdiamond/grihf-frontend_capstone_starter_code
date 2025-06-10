import { UsersState } from './types';
import { RootState } from '../../app/stores';
import { fetchUser } from './fetchUsers';
import { createSlice } from '@reduxjs/toolkit';
import { EStatus } from '../../common/abstracts/enums';

const initialState: UsersState = {
  list: [],
  user: null,
  error: null,
  status: EStatus.idle,
};

export const selectStatus = (state: RootState) => state.users.status;
export const selectError = (state: RootState) => state.users.error;

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // When we send a request,
    // `fetchUsers.pending` is being fired:
    // builder.addCase(fetchUsers.pending, (state) => {
    //     // At that moment,
    //     // we change status to `loading`
    //     // and clear all the previous errors:
    //     state.status = EStatus.loading;
    //     state.error = null;
    // });
    //
    // // When a server responses with the data,
    // // `fetchUsers.fulfilled` is fired:
    // builder.addCase(fetchUsers.fulfilled,
    //     (state, { payload }) => {
    //         // We add all the new users into the state
    //         // and change `status` back to `idle`:
    //         state.list.push(...payload);
    //         state.status = EStatus.idle;
    //     });
    //
    // // When a server responses with an error:
    // builder.addCase(fetchUser.rejected,
    //     (state, { payload }) => {
    //         // We show the error message
    //         // and change `status` back to `idle` again.
    //         // if (payload) state.error = payload.message;
    //         state.status = EStatus.idle;
    //     });
    builder.addCase(fetchUser.pending, (state) => {
      // At that moment,
      // we change status to `loading`
      // and clear all the previous errors:
      state.status = EStatus.loading;
      state.error = null;
    });
    builder.addCase(fetchUser.fulfilled, (state, { payload }) => {
      // We add all the new users into the state
      // and change `status` back to `idle`:
      state.user = payload;
      state.status = EStatus.idle;
    });
    builder.addCase(fetchUser.rejected, (state) => {
      // We show the error message
      // and change `status` back to `idle` again.
      // if (payload) state.error = payload.message;
      state.status = EStatus.idle;
    });
  },
});

export const selectUserName = (state: RootState) => state.users.user?.name;
export const selectUsers = (state: RootState) => state.users.list;
export const selectUserFetchStatus = (state: RootState) => state.users.status;
// export const {addTodo, removeTodo, toggleTodo} = usersSlice.actions;
export default usersSlice.reducer;
