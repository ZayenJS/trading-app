import { createAction } from '@reduxjs/toolkit';
import { SetThemePayload, SetCurrencyPayload } from './global.payload';

export enum GlobalActionType {
  SET_THEME = 'SET_THEME',
  SET_CURRENCY = 'SET_CURRENCY',
}

export const setTheme = createAction(GlobalActionType.SET_THEME, (payload: SetThemePayload) => ({ payload }));
export const setCurrency = createAction(GlobalActionType.SET_CURRENCY, (payload: SetCurrencyPayload) => ({ payload }));
