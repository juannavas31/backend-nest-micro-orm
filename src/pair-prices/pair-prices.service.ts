import { Injectable, Logger } from '@nestjs/common';
import { Pair } from 'src/entities/pair.entity';
import { PairPricesDto } from './model/pair-prices.dto';
import { RepositoryService } from 'src/repository/repository.service';


@Injectable()
export class PairPricesService {
    private readonly logger = new Logger(PairPricesService.name);

    constructor(
        private readonly repositoryService: RepositoryService,
    ) {};

    async getPairPrices(name: string): Promise<PairPricesDto> {
        this.logger.log(`Called getPairPrices with name: ${name}`);
        const pair = await this.repositoryService.findByName(name);
        return new PairPricesDto(pair);
    }
}
