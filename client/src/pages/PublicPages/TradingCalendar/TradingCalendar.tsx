import { FC } from 'react';
import Calendar from '../../../components/Calendar/Calendar';

import classes from './TradingCalendar.module.scss';

export interface TradingCalendarProps {}

const TradingCalendar: FC<TradingCalendarProps> = () => {
  return (
    <div className={classes.Container}>
      <Calendar />
    </div>
  );
};

export default TradingCalendar;
