import { Pair } from "src/entities/pair.entity";
import { PickType } from '@nestjs/mapped-types';

export class PairPricesDto extends PickType(Pair, ['name', 'price']) {
    constructor(pair: Pair) {
        super();
        this.name = pair.name;
        this.price = pair.price;
    }
}