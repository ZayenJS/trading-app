import { createReducer } from '@reduxjs/toolkit';
import { Theme } from '../../models/Theme';
import { setTheme } from '../actions';

export type GlobalState = {
  theme: Theme;
};

const INITIAL_STATE: GlobalState = {
  theme: 'dark',
};
export const globalReducer = createReducer(INITIAL_STATE, (builder) => {
  builder.addCase(setTheme, (state, action) => {
    state.theme = action.payload.theme;
  });
});
