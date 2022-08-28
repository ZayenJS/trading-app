import { FC } from 'react';
import { useCurrency } from '../../hooks/useCurrency';

import classes from './CustomTooltip.module.scss';

export interface CustomTooltipProps {
  active?: boolean;
  payload?: any;
  label?: string;
}

const CustomTooltip: FC<CustomTooltipProps> = ({ active, payload }) => {
  const [currency] = useCurrency();
  if (active && payload?.length) {
    const data = { ...payload[0].payload };

    let text = '';

    if (data.type === 'profit') {
      text = 'This was a profitable trade';
    } else if (data.type === 'loss') {
      text = 'This was a losing trade';
    }

    const value = data.value.toFixed(2);
    let currencyText = `${value}${currency}`;

    if (currency === '$') {
      currencyText = `$${value}`;
    }

    let diffText = '';

    if (data.diff) {
      const diff = data.diff.toFixed(2);

      diffText = `+${diff}€`;

      if (data.type === 'loss') {
        diffText = `-${diff}€`;
      }

      if (currency === '$') {
        diffText = `+$${diff}`;

        if (data.type === 'loss') {
          diffText = `-$${diff}`;
        }
      }
    }

    const percentage = data.percentage > 0 ? `+${data.percentage}` : `${data.percentage}`;
    const uppercasedType = data.type.charAt(0).toUpperCase() + data.type.slice(1);

    return (
      <div className={classes.Container}>
        <p className={classes.Label}>balance: {currencyText}</p>
        {data.percentage && <p className={classes.Percentage}>percentage: {percentage}%</p>}
        {diffText && <p className={classes.Diff}>difference: {diffText}</p>}
        {text && <p className={`${classes.Text} ${classes[uppercasedType]}`}>{text}</p>}
      </div>
    );
  }

  return null;
};

export default CustomTooltip;
