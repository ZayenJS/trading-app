import { FC, MouseEvent, useMemo } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { Theme } from '../../models/Theme';

import classes from './ThemeSwitcher.module.scss';

export interface ThemeSwitcherProps {}

const ThemeSwitcher: FC<ThemeSwitcherProps> = () => {
  const [theme, setTheme] = useTheme();

  const isLightTheme = useMemo(() => {
    return theme === 'light';
  }, [theme]);

  const onButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    const newTheme = (event.target as HTMLButtonElement).name as Theme;

    if (newTheme !== theme) setTheme(newTheme);
  };

  const containerClasses = useMemo(() => {
    return `${classes.Container} ${isLightTheme ? classes.Light : classes.Dark}`;
  }, [isLightTheme]);

  return (
    <div className={containerClasses}>
      <div>
        <button name="light" onClick={onButtonClick} className={isLightTheme ? classes.Active : ''}>
          Light
        </button>
        <button name="dark" onClick={onButtonClick} className={isLightTheme ? '' : classes.Active}>
          Dark
        </button>
      </div>
    </div>
  );
};

export default ThemeSwitcher;
