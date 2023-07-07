import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Session,
  UnauthorizedException,
} from '@nestjs/common';
import { TradesService } from './trades.service';
import { CreateTradeDto } from './dto/create-trade.dto';
import { UpdateTradeDto } from './dto/update-trade.dto';
import { NestSession } from '../../models/NestSession';

@Controller('trades')
export class TradesController {
  constructor(private readonly tradesService: TradesService) {}

  @Post()
  create(
    @Body() createTradeDto: CreateTradeDto,
    @Session() session: NestSession,
  ) {
    if (!session.user) {
      throw new UnauthorizedException(
        'You must be logged in to create a trade',
      );
    }

    return this.tradesService.create(createTradeDto);
  }

  @Get()
  findAll() {
    return this.tradesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tradesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTradeDto: UpdateTradeDto) {
    return this.tradesService.update(+id, updateTradeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tradesService.remove(+id);
  }
}
