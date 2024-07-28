import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateBuyTradeDTO {
    @IsString()
    @IsNotEmpty()
    shareId: string;

    @IsNumber()
    @IsNotEmpty()
    quantity: number;
}