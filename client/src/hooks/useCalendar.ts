import { useSelector, useDispatch } from 'react-redux';
import dayjs from 'dayjs/';
import weekdayPlugin from 'dayjs/plugin/weekday';

import { State } from '../store';
import { setDate, setDay, setMonth, setStartDay, setYear } from '../store/actions/calendar';
import { useEffect } from 'react';

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

  const DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const DAYS_LEAP = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const DAYS_OF_THE_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  useEffect(() => {
    dispatch(setDay({ day: calendarState.date.getDate() }));
    dispatch(setMonth({ month: calendarState.date.getMonth() }));
    dispatch(setYear({ year: calendarState.date.getFullYear() }));
    dispatch(setStartDay({ startDay: getStartDayOfMonth(calendarState.date) }));
  }, [calendarState.date, dispatch]);

  const days = isLeapYear(calendarState.year) ? DAYS_LEAP : DAYS;
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
    currentMonth: MONTHS[calendarState.month],
    year: calendarState.year,
    setDate: (date: Date) => dispatch(setDate({ date })),
    DAYS_OF_THE_WEEK,
  };
};
