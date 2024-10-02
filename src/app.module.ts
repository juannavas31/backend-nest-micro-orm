import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { PairPricesModule } from './pair-prices/pair-prices.module';
import { CoinRefreshModule } from './coin-refresh/coin-refresh.module';
import { RepositoryModule } from './repository/repository.module';
import { OrmModule } from './orm/orm.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CoinRefreshModule,
    PairPricesModule,
    RepositoryModule,
    OrmModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
