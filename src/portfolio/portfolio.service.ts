import { PrismaService } from '@/infrastructure/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PortfolioService {
    constructor(
        private readonly prismaClient: PrismaService,
    ) { }


    public async createPortfolio(userId: string) {
        return this.prismaClient.portfolio.create({
            data: {
                userId: userId,
            },
        });
    }


    public async deletePortfolio(userId: string) {
        return this.prismaClient.portfolio.updateMany({
            where: {
                userId: userId,
            },
            data: {
                deletedAt: new Date(),
            },
        });
    }

    async getPortfolio(userId: string) {
        return this.prismaClient.portfolio.findFirst({
            where: {
                userId: userId,
                deletedAt: null,
            },
            select: {
                id: true,
                shares: {
                    select: {
                        symbol: true,
                        price: true,
                    },
                },
                trades: {
                    select: {
                        type: true,
                        quantity: true,
                        price: true,
                        share: {
                            select: {
                                symbol: true,
                            },
                        },
                    },
                },
                deletedAt: true,
            },
        });
    }

    async getPortfolioById(portfolioId: string) {
        return this.prismaClient.portfolio.findFirst({
            where: {
                id: portfolioId,
                deletedAt: null,
            },
        });
    }
}
