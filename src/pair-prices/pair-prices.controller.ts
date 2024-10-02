import { Controller, Logger, Get, Param, NotFoundException } from '@nestjs/common';
import { PairPricesService } from './pair-prices.service';
import { PairPricesDto } from './model/pair-prices.dto';

@Controller('pair-prices')
export class PairPricesController {
  private readonly logger = new Logger(PairPricesController.name);
  constructor(private readonly pairPricesService: PairPricesService) {}

  @Get(':name')
  async getPairPrices(
    @Param('name') name: string,
  ): Promise<PairPricesDto> {
    this.logger.debug('Called getPairPrices');
    return this.pairPricesService.getPairPrices(name);
  }
}
