import { createReducer } from '@reduxjs/toolkit';

export type TradesState = {
  template: string;
};

const INITIAL_STATE: TradesState = {
  template: '',
};
export const tradesReducer = createReducer(INITIAL_STATE, (builder) => {});
