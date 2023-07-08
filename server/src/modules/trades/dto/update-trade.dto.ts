import { PartialType } from '@nestjs/mapped-types';
import { CreateTradeDto } from './create-trade.dto';
import { ApiProperty } from '@nestjs/swagger';
import { TradeType } from '@prisma/client';

export class UpdateTradeDto extends PartialType(CreateTradeDto) {
  @ApiProperty({
    enum: [TradeType.LONG, TradeType.SHORT],
    required: false,
    example: TradeType.LONG,
  })
  type: TradeType;
  @ApiProperty({ type: 'string', required: false, example: 'BTC' })
  baseCurrency: string;
  @ApiProperty({ type: 'string', required: false, example: 'USDT' })
  quoteCurrency: string;
  @ApiProperty({ type: 'number', required: false, example: 0.1 })
  fees: number;
  @ApiProperty({
    type: 'string',
    required: false,
    example: 'This was a good buying opportunity',
  })
  notes = '';
  @ApiProperty({ type: 'number', required: false, example: 10000 })
  entryPrice: number;
  @ApiProperty({ type: 'number', required: false, example: 11000 })
  exitPrice?: number;
  @ApiProperty({ type: 'number', required: false, example: 0.0284815 })
  quantity: number;
  @ApiProperty({
    type: 'string',
    required: false,
    example: '2020-08-01T00:00:00.000Z',
  })
  entryDate: Date;
  @ApiProperty({
    type: 'string',
    required: false,
    example: '2020-12-01T00:00:00.000Z',
  })
  exitDate?: Date;
}
