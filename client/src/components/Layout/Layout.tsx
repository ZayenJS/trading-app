import { FC, ReactNode } from 'react';

import classes from './Layout.module.scss';
import SideNav from '../SideNav/SideNav';

export interface LayoutProps {
  children?: ReactNode | ReactNode[];
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className={classes.Container}>
      <SideNav />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
