import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '@/auth/decorators/user.decorator';
import { IncreaseBalanceDTO } from './dto/update-balance.dto';
import { CustomAuthGuard } from '@/auth/guards/auth.guard';

@Controller({
    path: 'users',
    version: '1',
})
export class UsersController {

    constructor(
        private readonly usersService: UsersService
    ) { }


    @Get(':id')
    async getById(
        @Param('id') userId: string
    ) {
        return this.usersService.getById(userId);
    }


    @UseGuards(CustomAuthGuard)
    @Post('balance/increase')
    async increaseBalance(
        @User("id") userId: string,
        @Body() balanceDto: IncreaseBalanceDTO
    ) {
        return this.usersService.increaseBalance(userId, balanceDto);
    }


    @UseGuards(CustomAuthGuard)
    @Post('balance/decrease')
    async decreaseBalance(
        @User("id") userId: string,
        @Body() balanceDto: IncreaseBalanceDTO
    ) {
        return this.usersService.decreaseBalance(userId, balanceDto);
    }
}
