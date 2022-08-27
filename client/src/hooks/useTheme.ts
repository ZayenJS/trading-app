import { useDispatch, useSelector } from 'react-redux';
import { Theme } from '../models/Theme';
import { State } from '../store';
import { setTheme } from '../store/actions';

export const useTheme = (): [Theme, (theme: Theme) => void] => {
  const { theme } = useSelector((state: State) => state.global);
  const dispatch = useDispatch();

  return [theme, (theme: Theme) => dispatch(setTheme({ theme }))]; // TODO?: return value from hook
};
