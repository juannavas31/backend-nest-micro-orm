import { Module, Logger } from '@nestjs/common';
import { PairPricesService } from './pair-prices.service';
import { PairPricesController } from './pair-prices.controller';
import { RepositoryModule } from 'src/repository/repository.module';
import { OrmModule } from 'src/orm/orm.module';

@Module({
  imports: [
    RepositoryModule,
    OrmModule,
  ],
  controllers: [PairPricesController],
  providers: [PairPricesService],
})
export class PairPricesModule {}
