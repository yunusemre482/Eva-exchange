import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateSellTradeDTO {
    @IsString()
    @IsNotEmpty()
    shareId: string;

    @IsNumber()
    @IsNotEmpty()
    quantity: number;
}
