import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { CustomAuthGuard } from '@/auth/guards/auth.guard';
import { User } from '@/auth/decorators/user.decorator';


@UseGuards(CustomAuthGuard)
@Controller({
    path: 'portfolios',
    version: '1'
})
export class PortfolioController {
    constructor(
        private readonly portfolioService: PortfolioService
    ) { }


    @Get("user")
    public async getPortfolio(
        @User("id") userId: string
    ) {
        return this.portfolioService.getPortfolio(userId);
    }

    @Get(":id")
    public async getPortfolioById(
        @Param("id") portfolioId: string
    ) {
        return this.portfolioService.getPortfolioById(portfolioId);
    }

    @Post()
    public async createPortfolio(
        @User("id") userId: string
    ) {
        return this.portfolioService.createPortfolio(userId);
    }
}
