import { FC } from 'react';

import classes from './NotFound.module.scss';

export interface NotFoundProps {}

const NotFound: FC<NotFoundProps> = () => {
  return <div className={classes.Container}>NotFound Function Component</div>;
};

export default NotFound;
