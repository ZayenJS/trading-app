import { ApiProperty } from '@nestjs/swagger';
import { TradeType } from '@prisma/client';

export class CreateTradeDto {
  @ApiProperty({
    enum: [TradeType.LONG, TradeType.SHORT],
  })
  type: TradeType;
  @ApiProperty({ type: 'string', example: 'BTC' })
  baseCurrency: string;
  @ApiProperty({ type: 'string', examples: ['USDT', 'ETH'] })
  quoteCurrency: string;
  @ApiProperty({ type: 'number', example: 0.1 })
  fees: number;
  @ApiProperty({
    type: 'string',
    required: false,
    example: 'This was a good buying opportunity',
  })
  notes = '';
  @ApiProperty({ type: 'number', example: 10000 })
  entryPrice: number;
  @ApiProperty({ type: 'number', required: false, example: 11000 })
  exitPrice?: number;
  @ApiProperty({ type: 'number', example: 0.0284815 })
  quantity: number;
  @ApiProperty({ type: 'string', example: '2020-08-01T00:00:00.000Z' })
  entryDate: Date;
  @ApiProperty({
    type: 'string',
    required: false,
    example: '2020-12-01T00:00:00.000Z',
  })
  exitDate?: Date;

  public constructor(init?: Partial<CreateTradeDto>) {
    Object.assign(this, init);
  }

  public isValid() {
    return (
      this.type &&
      this.baseCurrency &&
      this.quoteCurrency &&
      this.fees &&
      this.entryPrice &&
      this.quantity &&
      this.entryDate
    );
  }

  public getFirstMissingField() {
    if (!this.type) return 'type';
    if (!this.baseCurrency) return 'base currency';
    if (!this.quoteCurrency) return 'quote currency';
    if (!this.fees) return 'fees';
    if (!this.entryPrice) return 'entry price';
    if (!this.quantity) return 'quantity';
    if (!this.entryDate) return 'entry date';
  }
}
