import { ShareService } from '@/share/share.service';
import { UsersService } from '@/users/users.service';
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateSellTradeDTO } from './dto/create-sell-trade.dto';
import { CreateBuyTradeDTO } from './dto/create-buy-trade.dto';

@Injectable()
export class TradeService {


    constructor(
        private readonly prismaClient: PrismaClient,
        private readonly shareService: ShareService,
        private readonly userService: UsersService,
    ) { }


    public async createBuyTrade(userId: string, createBuyTradeDTO: CreateBuyTradeDTO) {
        // Create a buy trade

    }


    public async createSellTrade(userId: string, createSellTradeDTO: CreateSellTradeDTO) {

    }

    public async getAll() {
        return this.prismaClient.trade.findMany();
    }

    public async getTradesByUserId(userId: string) {
        return this.prismaClient.trade.findMany({
            where: {
                userId: userId,
            },
        });
    }


}
