import { createReducer } from '@reduxjs/toolkit';
import { FiatCurrency } from '../../models/FiatCurrency';
import { Theme } from '../../models/Theme';
import { setTheme } from '../actions';

export type GlobalState = {
  theme: Theme;
  currency: FiatCurrency;
};

const INITIAL_STATE: GlobalState = {
  theme: 'dark',
  currency: '€',
};
export const globalReducer = createReducer(INITIAL_STATE, (builder) => {
  builder.addCase(setTheme, (state, action) => {
    state.theme = action.payload.theme;
  });
});
