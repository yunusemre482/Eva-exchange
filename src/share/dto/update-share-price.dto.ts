import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber } from "class-validator";

export class UpdateSharePriceDTO {

    @IsNumber()
    @IsNotEmpty()
    @Transform(({ value }) => parseFloat(value).toFixed(2))
    price: number;
}