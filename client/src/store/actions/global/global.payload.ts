import { FiatCurrency } from '../../../models/FiatCurrency';
import { Theme } from '../../../models/Theme';

export interface SetThemePayload {
  theme: Theme;
}

export interface SetCurrencyPayload {
  currency: FiatCurrency;
}
