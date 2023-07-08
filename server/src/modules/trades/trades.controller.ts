import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Session,
  Query,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { TradesService } from './trades.service';
import { CreateTradeDto } from './dto/create-trade.dto';
import { UpdateTradeDto } from './dto/update-trade.dto';
import { NestSession } from '../../models/NestSession';
import { LoggedInGuard } from '../auth/auth.guard';
import { ApiOperation, ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger';
import apiOperation from './doc/api-operation';
import apiResponse from './doc/api-response';

@ApiTags('Trades')
@Controller('trades')
export class TradesController {
  constructor(private readonly tradesService: TradesService) {}

  @UseGuards(LoggedInGuard)
  // @ApiBody(apiRequestBody.create)
  @ApiOperation(apiOperation.create)
  @ApiResponse(apiResponse.create[201])
  @ApiResponse(apiResponse.create[400])
  @ApiResponse(apiResponse.create[401])
  @Post()
  create(@Body() body: CreateTradeDto, @Session() session: NestSession) {
    const createTradeDto = new CreateTradeDto(body);

    if (!createTradeDto.isValid()) {
      const missingField = createTradeDto.getFirstMissingField();

      throw new BadRequestException(
        `The "${missingField}" value is missing but required to create a new trade`,
      );
    }

    return this.tradesService.create(session.user.id, createTradeDto);
  }

  @UseGuards(LoggedInGuard)
  @ApiOperation(apiOperation.findAll)
  @ApiResponse(apiResponse.findAll[200])
  @Get()
  findAll(
    @Session() session: NestSession,
    @Query('page') page?: number,
    @Query('per-page') perPage?: number,
  ) {
    return this.tradesService.findAll(session.user.id, page, perPage);
  }

  @UseGuards(LoggedInGuard)
  @ApiOperation(apiOperation.findOne)
  @ApiResponse(apiResponse.findOne[200])
  @ApiResponse(apiResponse.findOne[401])
  @Get(':id')
  findOne(@Param('id') id: string, @Session() session: NestSession) {
    return this.tradesService.findOne(id, session.user.id);
  }

  @UseGuards(LoggedInGuard)
  // @ApiBody(apiRequestBody.update)
  @ApiOperation(apiOperation.update)
  @ApiResponse(apiResponse.update[200])
  @ApiResponse(apiResponse.update[403])
  @ApiResponse(apiResponse.update[404])
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTradeDto: UpdateTradeDto,
    @Session() session: NestSession,
  ) {
    return this.tradesService.update(id, updateTradeDto, session.user.id);
  }

  @UseGuards(LoggedInGuard)
  @ApiOperation(apiOperation.remove)
  @ApiResponse(apiResponse.remove[200])
  @ApiResponse(apiResponse.remove[403])
  @ApiResponse(apiResponse.remove[404])
  @Delete(':id')
  remove(@Param('id') id: string, @Session() session: NestSession) {
    return this.tradesService.remove(id, session.user.id);
  }
}
