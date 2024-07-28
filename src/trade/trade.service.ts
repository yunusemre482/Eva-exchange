import { ShareService } from '@/share/share.service';
import { UsersService } from '@/users/users.service';
import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { TradeType } from '@prisma/client';
import { CreateSellTradeDTO } from './dto/create-sell-trade.dto';
import { CreateBuyTradeDTO } from './dto/create-buy-trade.dto';
import { DecreaseBalanceDTO, IncreaseBalanceDTO } from '@/users/dto/update-balance.dto';
import { PrismaService } from '@/infrastructure/prisma/prisma.service';

@Injectable()
export class TradeService {
    private readonly logger = new Logger(TradeService.name);


    constructor(
        private readonly prismaClient: PrismaService,
        private readonly shareService: ShareService,
        private readonly userService: UsersService,
    ) { }


    public async createBuyTrade(userId: string, createBuyTradeDTO: CreateBuyTradeDTO) {
        // Create a buy trade
        try {

            const user = await this.userService.getById(userId);

            // If the application encounters an error along the way, the async function will throw an exception and automatically rollback the transaction.
            const transaction = await this.prismaClient.$transaction(async (tx) => {
                const share = await this.shareService.getById(createBuyTradeDTO.shareId);

                if (!share) {
                    throw new NotFoundException('Share not found');
                }

                const tradePrice = share.price * createBuyTradeDTO.quantity;

                if (user.balance < tradePrice) {
                    throw new BadRequestException('Insufficient balance');
                }

                const portfolio = await tx.portfolio.findFirst({
                    where: {
                        userId: user.id,
                        deletedAt: null,
                    },
                });


                const trade = await tx.trade.create({
                    data: {
                        userId: user.id,
                        portfolioId: portfolio.id,
                        shareId: share.id,
                        type: TradeType.BUY,
                        quantity: createBuyTradeDTO.quantity,
                        price: tradePrice,
                    },
                });


                portfolio.quantity += createBuyTradeDTO.quantity;


                await this.userService.decreaseBalance(userId, new DecreaseBalanceDTO(tradePrice));
                await tx.portfolio.update({
                    where: {
                        id: portfolio.id,
                    },
                    data: {
                        quantity: portfolio.quantity,
                    },
                });

                return trade;
            })

        } catch (err) {
            this.logger.error(err);
            throw new BadRequestException('Error while creating trade');
        }
    }


    public async createSellTrade(userId: string, createSellTradeDTO: CreateSellTradeDTO) {

        // Create a sell trade
        try {

            // If the application encounters an error along the way, the async function will throw an exception and automatically rollback the transaction.
            await this.prismaClient.$transaction(async (tx) => {

                const user = await tx.user.findFirst({
                    where: {
                        id: userId,
                    },
                    include: {
                        portfolios: {
                            include: {
                                trades: true,
                                shares: true
                            },
                        },
                    },
                });

                const share = await this.shareService.getById(createSellTradeDTO.shareId);

                if (!share) {
                    throw new NotFoundException('Share not found');
                }

                const portfolio = user.portfolios.find((portfolio) => portfolio.shares.some((s) => s.id === share.id));


                if (!portfolio) {
                    throw new NotFoundException('Share not found in portfolio');
                }

                if (portfolio.quantity < createSellTradeDTO.quantity) {
                    throw new BadRequestException('Insufficient shares');
                }


                portfolio.quantity -= createSellTradeDTO.quantity;

                const tradePrice = share.price * createSellTradeDTO.quantity;


                const trade = await tx.trade.create({
                    data: {
                        userId: user.id,
                        portfolioId: portfolio.id,
                        shareId: share.id,
                        type: TradeType.SELL,
                        quantity: createSellTradeDTO.quantity,
                        price: tradePrice,
                    },
                });

                await this.userService.increaseBalance(userId, new IncreaseBalanceDTO(tradePrice));
                await tx.portfolio.update({
                    where: {
                        id: portfolio.id,
                    },
                    data: {
                        quantity: portfolio.quantity,
                    },
                });

                return trade;
            })

        } catch (err) {
            this.logger.error(err);
            throw new BadRequestException('Error while creating trade');
        }

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
