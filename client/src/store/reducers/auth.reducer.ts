import { createReducer } from '@reduxjs/toolkit';
import { checkUser, login } from '../actions/auth';

export type AuthState = {
  user: any;
  checkingUser: boolean;
};

const INITIAL_STATE: AuthState = {
  user: null,
  checkingUser: false,
};
export const authReducer = createReducer(INITIAL_STATE, (builder) => {
  builder
    .addCase(login.fulfilled, (state, action) => {
      state.user = action.payload.user;
    })
    .addCase(checkUser.pending, (state) => {
      state.checkingUser = true;
    })
    .addCase(checkUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.checkingUser = false;
    });
});
