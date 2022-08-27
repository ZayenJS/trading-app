import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateStrategyDto } from './dto/create-strategy.dto';
import { UpdateStrategyDto } from './dto/update-strategy.dto';

@Injectable()
export class StrategyService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createStrategyDto: CreateStrategyDto) {
    return this.prismaService.strategy.create({
      data: {
        ...createStrategyDto,
      },
    });
  }

  findAll(skip: number, take: number) {
    return this.prismaService.strategy.findMany({
      skip,
      take,
    });
  }

  findOne(id: number) {
    return this.prismaService.strategy.findUniqueOrThrow({
      where: {
        id,
      },
    });
  }

  update(id: number, updateStrategyDto: UpdateStrategyDto) {
    return this.prismaService.strategy.update({
      where: {
        id,
      },
      data: {
        ...updateStrategyDto,
      },
    });
  }

  remove(id: number) {
    return this.prismaService.strategy.delete({
      where: {
        id,
      },
    });
  }
}
