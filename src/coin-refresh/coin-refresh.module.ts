import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CoinRefreshService } from './coin-refresh.service';
import { RepositoryModule } from 'src/repository/repository.module';
import { OrmModule } from 'src/orm/orm.module'; 

@Module({
  imports: [
    HttpModule,
    RepositoryModule,
    OrmModule,
  ],
  providers: [CoinRefreshService],
})
export class CoinRefreshModule {}