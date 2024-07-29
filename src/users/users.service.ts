import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { DecreaseBalanceDTO, IncreaseBalanceDTO } from './dto/update-balance.dto';
import { PrismaService } from '@/infrastructure/prisma/prisma.service';

@Injectable()
export class UsersService {
    private readonly logger = new Logger(UsersService.name);

    constructor(
        // You can inject the Prisma client into the service
        // by adding it to the constructor
        // For example, you can inject the Prisma client like this:
        private readonly prisma: PrismaService,
    ) { }

    public async create(user: any): Promise<any> {
        return this.prisma.user.create({
            data: user,
        });
    }


    async getById(id: string): Promise<any> {

        const user = await this.prisma.user.findFirst({
            where: {
                id: id,
            },
            select: {
                id: true,
                email: true,
                roles: true,
                createdAt: true,
                updatedAt: true,
                balance: true,
            },
        });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return user;
    }


    async getByEmail(email: string): Promise<any> {
        const user = await this.prisma.user.findUnique({
            where: {
                email: email,
            },
        });

        return user;
    }

    async increaseBalance(id: string, balanceDto: IncreaseBalanceDTO): Promise<any> {
        const user = await this.prisma.user.update({
            where: {
                id: id,
            },
            data: {
                balance: {
                    increment: balanceDto.amount,
                },
            },
        });

        return user;
    }

    async decreaseBalance(id: string, balanceDto: DecreaseBalanceDTO): Promise<any> {

        this.logger.debug(`Decreasing balance of user with id ${id} by ${balanceDto.amount}`);

        const user = await this.prisma.user.update({
            where: {
                id: id,
            },
            data: {
                balance: {
                    decrement: balanceDto.amount,
                },
            },
        });

        return user;
    }

}
