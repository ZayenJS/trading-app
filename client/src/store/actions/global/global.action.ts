import { createAction } from '@reduxjs/toolkit';
import { SetThemePayload } from './global.payload';

export enum GlobalActionType {
  SET_THEME = 'SET_THEME',
}

export const setTheme = createAction(GlobalActionType.SET_THEME, (payload: SetThemePayload) => ({ payload }));
