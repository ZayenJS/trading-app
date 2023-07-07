import { Module } from '@nestjs/common';
import { TradesService } from './trades.service';
import { TradesController } from './trades.controller';
import { PrismaService } from '../../prisma.service';

@Module({
  providers: [TradesService, PrismaService],
  controllers: [TradesController],
})
export class TradesModule {}
