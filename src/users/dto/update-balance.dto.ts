import { IsNotEmpty, IsNumber } from "class-validator";

export class UpdateBalanceDTO {

    @IsNumber()
    @IsNotEmpty()
    amount: number;


    constructor(amount: number) {
        this.amount = amount;
    }

}


export class IncreaseBalanceDTO extends UpdateBalanceDTO {
    constructor(amount: number) {
        super(amount);
    }
}

export class DecreaseBalanceDTO extends UpdateBalanceDTO {

    constructor(amount: number) {
        super(amount);
    }
}

