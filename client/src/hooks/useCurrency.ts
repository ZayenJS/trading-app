import { useSelector, useDispatch } from 'react-redux';
import { FiatCurrency } from '../models/FiatCurrency';
import { State } from '../store';
import { setCurrency } from '../store/actions';

export const useCurrency = (): [FiatCurrency, (currency: FiatCurrency) => void] => {
  const { currency } = useSelector((state: State) => state.global);
  const dispatch = useDispatch();

  return [currency, (currency: FiatCurrency) => dispatch(setCurrency({ currency }))];
};
