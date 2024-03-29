export const CALENDAR = {
  DAYS: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
  DAYS_LEAP: [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
  DAYS_OF_THE_WEEK: [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ],
  MONTHS: [
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
  ],
  YEARS: new Array(200).fill(1900).map((element, i) => i + element),
};
