import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ShareService } from './share.service';
import { CreateShareDTO } from './dto/create-share.dto';
import { UpdateSharePriceDTO } from './dto/update-share-price.dto';

@Controller('shares')
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

    @Post(":id/price")
    async updatePrice(
        @Param("id") id: string,
        @Body() priceUpdate: UpdateSharePriceDTO,
    ) {
        return this.shareService.updatePrice(id, priceUpdate);
    }
}
