import { createReducer } from '@reduxjs/toolkit';
import { setDate, setDay, setMonth, setStartDay, setYear } from '../actions/calendar';

export type CalendarState = {
  date: Date;
  day: number;
  month: number;
  year: number;
  startDay: number;
  view: 'month' | 'year';
  startingDay: 'Mon' | 'Sun';
};

const INITIAL_STATE: CalendarState = {
  date: new Date(),
  day: new Date().getDate(),
  month: new Date().getMonth(),
  year: new Date().getFullYear(),
  startDay: 0,
  view: 'month',
  startingDay: 'Sun',
};

export const calendarReducer = createReducer(INITIAL_STATE, (builder) => {
  builder
    .addCase(setDate, (state, action) => {
      state.date = action.payload.date;
    })
    .addCase(setDay, (state, action) => {
      state.day = action.payload.day;
    })
    .addCase(setMonth, (state, action) => {
      state.month = action.payload.month;
    })
    .addCase(setYear, (state, action) => {
      state.year = action.payload.year;
    })
    .addCase(setStartDay, (state, action) => {
      state.startDay = action.payload.startDay;
    });
});
