import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTradeDto } from './dto/create-trade.dto';
import { UpdateTradeDto } from './dto/update-trade.dto';
import { PrismaService } from '../../prisma.service';
import { Trade, TradeType } from '@prisma/client';
import { Status } from '../../models/Status';
import pagination from '../../config/pagination';

@Injectable()
export class TradesService {
  public constructor(private readonly prisma: PrismaService) {}

  private ensureTradeExists(trade: Trade, id: string) {
    if (!trade) {
      throw new NotFoundException(`Trade with id #${id} not found.`);
    }
  }
  private ensureOwnership(trade: Trade, traderId: string) {
    if (trade?.traderId !== traderId) {
      throw new ForbiddenException(
        `Trade with id #${trade.id} does not belong to you.`,
      );
    }
  }

  private ensureCanPerformAction(
    trade: Trade,
    tradeId: string,
    traderId: string,
  ) {
    this.ensureTradeExists(trade, tradeId);
    this.ensureOwnership(trade, traderId);
  }

  public create(traderId: string, createTradeDto: CreateTradeDto) {
    return this.prisma.trade.create({
      data: {
        ...createTradeDto,
        type: createTradeDto.type.toUpperCase() as TradeType,
        trader: {
          connect: {
            id: traderId,
          },
        },
      },
    });
  }

  public findAll(traderId: string, page?: number, perPage?: number) {
    const _page = page || 1;
    const _perPage = perPage || pagination.PER_PAGE;

    return this.prisma.trade.findMany({
      skip: +(_page - 1) * _perPage,
      take: +_perPage,
      where: {
        traderId,
      },
    });
  }

  public findOne(id: string, traderId: string) {
    return this.prisma.trade.findFirst({
      where: {
        id,
        traderId,
      },
    });
  }

  public async update(
    id: string,
    updateTradeDto: UpdateTradeDto,
    traderId: string,
  ) {
    const trade = await this.prisma.trade.findUnique({
      where: {
        id,
      },
    });

    this.ensureCanPerformAction(trade, id, traderId);

    return this.prisma.trade.update({
      where: {
        id,
      },
      data: {
        ...updateTradeDto,
        type: updateTradeDto.type.toUpperCase() as TradeType,
      },
    });
  }

  public async remove(id: string, traderId: string) {
    const trade = await this.prisma.trade.findUnique({
      where: {
        id,
      },
    });

    this.ensureCanPerformAction(trade, id, traderId);

    const success = await this.prisma.trade.delete({
      where: {
        id,
      },
    });

    return {
      status: success ? Status.OK : Status.ERROR,
    };
  }
}
