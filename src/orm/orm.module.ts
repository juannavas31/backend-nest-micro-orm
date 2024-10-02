import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';

import { Pair } from 'src/entities/pair.entity';

@Module({
  imports: [
    MikroOrmModule.forRoot(),
    MikroOrmModule.forFeature({
      entities: [Pair],
    }),
  ],
  exports: [MikroOrmModule],
})
export class OrmModule { }
