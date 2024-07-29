import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber } from "class-validator";

export class UpdateSharePriceDTO {

    @Transform(({ value }) => parseFloat(value).toFixed(2))
    @IsNotEmpty()
    price: number;
}