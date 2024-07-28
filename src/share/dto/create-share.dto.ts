import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from "class-validator";

export class CreateShareDTO {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(3)
    symbol: string;


    @IsNumber()
    @IsNotEmpty()
    @Transform(({ value }) => parseFloat(value).toFixed(2))
    price: number;
}