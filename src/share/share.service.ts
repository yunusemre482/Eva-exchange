import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateSharePriceDTO } from './dto/update-share-price.dto';
import { PrismaService } from '@/infrastructure/prisma/prisma.service';
import { CreateShareDTO } from './dto/create-share.dto';

@Injectable()
export class ShareService {

    constructor(
        private readonly prismaClient: PrismaService,
    ) { }


    public async create(share: CreateShareDTO): Promise<any> {
        return this.prismaClient.share.create({
            data: share,
        });
    }


    async getById(id: string): Promise<any> {

        const share = await this.prismaClient.share.findFirst({
            where: {
                id: id,
            },
            select: {
                id: true,
                symbol: true,
                price: true,
                createdAt: true,
                updatedAt: true,
            },
        });

        if (!share) {
            throw new NotFoundException('Share not found');
        }

        return share;
    }


    async getBySymbol(symbol: string): Promise<any> {
        const share = await this.prismaClient.share.findUnique({
            where: {
                symbol: symbol,
            },
        });

        return share;
    }


    async updatePrice(id: string, updateSahrePriceDto: UpdateSharePriceDTO): Promise<any> {
        const share = await this.prismaClient.share.update({
            where: {
                id: id,
            },
            data: {
                price: updateSahrePriceDto.price,
            },
        });

        return share;
    }


    async delete(id: string): Promise<any> {
        const share = await this.prismaClient.share.delete({
            where: {
                id: id,
            },
        });

        return share;
    }


    async getAll(): Promise<any> {
        const shares = await this.prismaClient.share.findMany();

        return shares;
    }


    async getSharePrice(symbol: string): Promise<any> {
        const share = await this.prismaClient.share.findUnique({
            where: {
                symbol: symbol,
            },
            select: {
                price: true,
            },
        });

        return share;
    }


    async getSharePriceById(id: string): Promise<any> {
        const share = await this.prismaClient.share.findUnique({
            where: {
                id: id,
            },
            select: {
                price: true,
            },
        });

        return share;
    }


}
