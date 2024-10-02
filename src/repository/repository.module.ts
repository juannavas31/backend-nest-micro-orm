import { Module, Logger } from '@nestjs/common';
import { RepositoryService } from 'src/repository/repository.service';
import { OrmModule } from 'src/orm/orm.module';

@Module({
  imports: [OrmModule],
  controllers: [],
  providers: [RepositoryService],
  exports: [RepositoryService],
})
export class RepositoryModule {}
