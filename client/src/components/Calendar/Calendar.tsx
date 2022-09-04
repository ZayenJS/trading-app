import { FC } from 'react';
import { useCalendar } from '../../hooks/useCalendar';
import classes from './Calendar.module.scss';

export interface CalendarProps {}

const Calendar: FC<CalendarProps> = () => {
  const { today, currentMonth, days, day, month, year, startDay, displayedDays, setDate, DAYS_OF_THE_WEEK } =
    useCalendar();

  const trades = [
    {
      date: '2022-09-01',
      title: 'Trade 1',
      description: 'Trade 1 description',
      amount: 100,
    },
    {
      date: '2022-09-01',
      title: 'Trade 2',
      description: 'Trade 2 description',
      amount: -110,
    },
    {
      date: '2022-09-03',
      title: 'Trade 3',
      description: 'Trade 3 description',
      amount: 200,
    },
  ];

  return (
    <div className={classes.Container}>
      <header>
        <button onClick={() => setDate(new Date(year, month - 1, day))}>Prev</button>
        <div>
          {currentMonth} {year}
        </div>
        <button onClick={() => setDate(new Date(year, month + 1, day))}>Next</button>
      </header>
      <main>
        {DAYS_OF_THE_WEEK.map((d) => (
          <div className={classes.Day__Name} key={d}>
            <strong>{d}</strong>
          </div>
        ))}
        {Array(displayedDays)
          .fill(null)
          .map((_, index) => {
            const d = index - (startDay - 2);
            let dayNumber = `${d}`;
            const previousMonthNumberOfDays = days[month === 0 ? 11 : month - 1];

            if (d < 10 && d > 0) dayNumber = `0${d}`;
            if (d < 1) dayNumber = `${previousMonthNumberOfDays + d}`;
            if (d > days[month]) dayNumber = `0${d - days[month]}`;

            const isPreviousMonth = d < 1;
            const isNextMonth = d > days[month];

            const dayData = trades
              .filter(
                (t) =>
                  !isPreviousMonth &&
                  !isNextMonth &&
                  t.date === `${year}-${month < 10 ? `0${month + 1}` : month + 1}-${dayNumber}`,
              )
              .reduce(
                (acc, curr) => {
                  acc.amount += curr.amount;
                  acc.trades += 1;

                  return acc;
                },
                { amount: 0, trades: 0 },
              );

            return (
              <div
                className={`${classes.Day} ${d === day ? classes.Selected : ''} ${
                  d === today.getDate() && month === today.getMonth() && year === today.getFullYear()
                    ? classes.Today
                    : ''
                }
                  ${isPreviousMonth ? classes.Previous : ''}
                  ${isNextMonth ? classes.Next : ''}
                  `}
                key={index}
                onClick={() => setDate(new Date(year, month, d))}>
                <div>
                  {dayData && dayData.trades > 0 && (
                    <>
                      <div className={classes.Day__Trades}>
                        <span>{dayData.trades} trades</span>
                      </div>
                      <div>
                        <span>{dayData.amount}€ </span>
                      </div>
                    </>
                  )}
                </div>
                <span className={classes.Day__Number}>{+dayNumber > 0 ? dayNumber : ''}</span>
              </div>
            );
          })}
      </main>
    </div>
  );
};

export default Calendar;
