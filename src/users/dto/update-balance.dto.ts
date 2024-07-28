import { IsNotEmpty, IsNumber } from "class-validator";

export class UpdateBalanceDTO {

    @IsNumber()
    @IsNotEmpty()
    amount: number;

}


export class IncreaseBalanceDTO extends UpdateBalanceDTO { }

export class DecreaseBalanceDTO extends UpdateBalanceDTO { }

