import { useSelector, useDispatch } from 'react-redux';
import dayjs from 'dayjs/';
import weekdayPlugin from 'dayjs/plugin/weekday';

import { State } from '../store';
import {
  setDate,
  setDay,
  setMonth,
  setStartDay,
  setYear,
} from '../store/actions/calendar';
import { useEffect } from 'react';
import { CALENDAR } from '../constants';

dayjs.extend(weekdayPlugin);

function isLeapYear(year: number) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

function getStartDayOfMonth(date: Date) {
  const startDate = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  return startDate === 0 ? 7 : startDate;
}

export const useCalendar = () => {
  const calendarState = useSelector((state: State) => state.calendar);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setDay({ day: calendarState.date.getDate() }));
    dispatch(setMonth({ month: calendarState.date.getMonth() }));
    dispatch(setYear({ year: calendarState.date.getFullYear() }));
    dispatch(setStartDay({ startDay: getStartDayOfMonth(calendarState.date) }));
  }, [calendarState.date, dispatch]);

  const days = isLeapYear(calendarState.year) ? CALENDAR.DAYS_LEAP : CALENDAR.DAYS;
  let displayedDays = days[calendarState.month] + (calendarState.startDay - 1);

  while (displayedDays % 7 !== 0) {
    displayedDays++;
  }

  return {
    today: new Date(),
    date: calendarState.date,
    days,
    day: calendarState.day,
    displayedDays,
    startDay: calendarState.startDay,
    month: calendarState.month,
    monthName: CALENDAR.MONTHS[calendarState.month],
    year: calendarState.year,
    setDate: (date: Date) => dispatch(setDate({ date })),
  };
};
