import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ShareService } from './share.service';
import { CreateShareDTO } from './dto/create-share.dto';
import { UpdateSharePriceDTO } from './dto/update-share-price.dto';

@Controller({
    path: 'shares',
    version: '1'
})
export class ShareController {

    constructor(
        private readonly shareService: ShareService,
    ) { }


    @Get("")
    async getAll() {
        return this.shareService.getAll();
    }

    @Get(":id")
    async getById(id: string) {
        return this.shareService.getById(id);
    }

    @Get("symbol/:symbol")
    async getBySymbol(
        @Param("symbol") symbol: string
    ) {
        return this.shareService.getBySymbol(symbol);
    }

    @Post("")
    async create(
        @Body() share: CreateShareDTO,
    ) {
        return this.shareService.create(share);
    }

    @Patch(":id")
    async updatePrice(
        @Param("id") id: string,
        @Body() priceUpdate: UpdateSharePriceDTO,
    ) {
        return this.shareService.updatePrice(id, priceUpdate);
    }
}
