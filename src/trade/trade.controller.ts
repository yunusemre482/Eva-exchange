import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { TradeService } from './trade.service';
import { CustomAuthGuard } from '@/auth/guards/auth.guard';
import { CreateSellTradeDTO } from './dto/create-sell-trade.dto';
import { User } from '@/auth/decorators/user.decorator';
import { CreateBuyTradeDTO } from './dto/create-buy-trade.dto';

@Controller({
    path: "trades",
    version: "1",
})
export class TradeController {


    constructor(
        private readonly tradeService: TradeService,
    ) { }


    @Get("")
    public async getAll() {
        return this.tradeService.getAll();
    }

    @Get("user")
    @UseGuards(CustomAuthGuard)
    public async getTradesByUser(
        @User("id") userId: string
    ) {
        return this.tradeService.getTradesByUserId(userId);
    }

    @Post("buy")
    public async createBuyTrade(
        @User("id") userId: string,
        @Body() createBuyTradeDTO: CreateBuyTradeDTO
    ) {
        return this.tradeService.createBuyTrade(userId, createBuyTradeDTO);
    }

    @UseGuards(CustomAuthGuard)
    @Post("sell")
    public async createSellTrade(
        @User("id") userId: string,
        @Body() createSellTradeDTO: CreateSellTradeDTO
    ) {
        return this.tradeService.createSellTrade(userId, createSellTradeDTO);
    }

}
