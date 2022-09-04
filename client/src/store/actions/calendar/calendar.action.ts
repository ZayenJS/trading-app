import { createAction } from '@reduxjs/toolkit';
import { SetDatePayload, SetDayPayload, SetMonthPayload, SetStartDayPayload, SetYearPayload } from './calendar.payload';

export enum CalendarActionType {
  SET_DATE = 'calendar/SET_DATE',
  SET_DAY = 'calendar/SET_DAY',
  SET_MONTH = 'calendar/SET_MONTH',
  SET_YEAR = 'calendar/SET_YEAR',
  SET_START_DAY = 'calendar/SET_START_DAY',
}

export const setDate = createAction(CalendarActionType.SET_DATE, (date: SetDatePayload) => ({
  payload: date,
}));
export const setDay = createAction(CalendarActionType.SET_DAY, (payload: SetDayPayload) => ({ payload }));
export const setMonth = createAction(CalendarActionType.SET_MONTH, (payload: SetMonthPayload) => ({ payload }));
export const setYear = createAction(CalendarActionType.SET_YEAR, (payload: SetYearPayload) => ({ payload }));
export const setStartDay = createAction(CalendarActionType.SET_START_DAY, (payload: SetStartDayPayload) => ({
  payload,
}));
