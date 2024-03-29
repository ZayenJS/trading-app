import { FC, FormEvent, useMemo } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';

import classes from './SideNav.module.scss';

export interface SideNavProps {}

const SideNav: FC<SideNavProps> = () => {
  const navigate = useNavigate();
  const navLinkActiveClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? `${classes.NavLink} ${classes.Active}` : classes.NavLink;

  const linksData = useMemo(
    () => [
      {
        key: 1,
        name: 'Home',
        to: '/',
      },
      {
        key: 2,
        name: 'Backtester',
        to: '/backtester',
      },
      {
        key: 3,
        name: 'Projector',
        to: '/projector',
      },
      {
        key: 4,
        name: 'Trading Calendar',
        to: '/trading-calendar',
      },
    ],
    [],
  );

  const links = useMemo(
    () =>
      linksData.map(({ key, name, to }) => (
        <li key={key} className={`${classes.ListItem} ${classes[name]}`}>
          <NavLink to={to} className={navLinkActiveClass}>
            <span>{name}</span>
          </NavLink>
        </li>
      )),
    [linksData],
  );

  const onFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await new Promise((resolve) => setTimeout(resolve, 1000));

    navigate('/login');
  };

  return (
    <nav className={classes.Container}>
      <div className={classes.LogoContainer}>
        <NavLink to="/">LOGO</NavLink>
        <ThemeSwitcher />
      </div>
      <div className={classes.Navigation}>
        <ul className={classes.List}>{links}</ul>
        <form className={classes.LogoutForm} onSubmit={onFormSubmit}>
          <button>Logout</button>
        </form>
      </div>
    </nav>
  );
};

export default SideNav;
