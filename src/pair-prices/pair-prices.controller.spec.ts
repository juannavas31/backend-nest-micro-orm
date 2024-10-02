import { Test, TestingModule } from '@nestjs/testing';
import { PairPricesController } from './pair-prices.controller';
import { PairPricesService } from './pair-prices.service';

describe('PairPricesController', () => {
  let controller: PairPricesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PairPricesController],
      providers: [PairPricesService],
    }).compile();

    controller = module.get<PairPricesController>(PairPricesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
