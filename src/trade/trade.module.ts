import { Module } from '@nestjs/common';
import { TradeController } from './trade.controller';
import { TradeService } from './trade.service';
import { PrismaClient } from '@prisma/client';
import { ShareService } from '@/share/share.service';
import { UsersService } from '@/users/users.service';

@Module({
  controllers: [TradeController],
  providers: [TradeService, ShareService, UsersService, PrismaClient]
})
export class TradeModule { }
