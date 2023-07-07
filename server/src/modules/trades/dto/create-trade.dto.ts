import { TradeType } from '../../../models/TradeType';

export class CreateTradeDto {
  type: TradeType;
  baseCurrency: string;
  quoteCurrency: string;
  notes = '';
  entryPrice: number;
  exitPrice: number;
  quantity: number;
  entryDate: Date;
  exitDate?: Date;
}
