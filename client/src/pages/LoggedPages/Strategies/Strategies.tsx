import { FC } from 'react';

import classes from './Strategies.module.scss';

export interface StrategiesProps {}

const Strategies: FC<StrategiesProps> = () => {
  return <div className={classes.Container}>Strategies Function Component</div>;
};

export default Strategies;
