import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { StrategyService } from './strategy.service';
import { CreateStrategyDto } from './dto/create-strategy.dto';
import { UpdateStrategyDto } from './dto/update-strategy.dto';

@Controller('strategy')
export class StrategyController {
  constructor(private readonly strategyService: StrategyService) {}

  @Post()
  create(@Body() createStrategyDto: CreateStrategyDto) {
    return this.strategyService.create(createStrategyDto);
  }

  @Get()
  findAll(@Query('skip') skip: number, @Query('take') take: number) {
    return this.strategyService.findAll(skip, take);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.strategyService.findOne(+id);
    } catch (error) {
      return error;
    }
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateStrategyDto: UpdateStrategyDto,
  ) {
    return this.strategyService.update(+id, updateStrategyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.strategyService.remove(+id);
  }
}
