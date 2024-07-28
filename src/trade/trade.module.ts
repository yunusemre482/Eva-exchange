import { Module } from '@nestjs/common';
import { TradeController } from './trade.controller';
import { TradeService } from './trade.service';
import { ShareService } from '@/share/share.service';
import { UsersService } from '@/users/users.service';
import { PrismaService } from '@/infrastructure/prisma/prisma.service';

@Module({
  controllers: [TradeController],
  providers: [TradeService, ShareService, UsersService, PrismaService]
})
export class TradeModule { }
