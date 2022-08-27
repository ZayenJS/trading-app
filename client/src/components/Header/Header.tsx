import { FC } from 'react';

import classes from './Header.module.scss';

export interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  return <header className={classes.Container}>Header Function Component</header>;
};

export default Header;
