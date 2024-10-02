import { Module } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { defineConfig } from '@mikro-orm/postgresql';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Pair } from './entities/pair.entity';
import { Migrator } from '@mikro-orm/migrations';

const logger = new Logger('MikroORM');
 
export default defineConfig({
  entities: [Pair],
  dbName: 'coindb',
  user: 'postgres',
  password: 'secret-password',
  host: 'localhost',
  port: 5442,
  debug: true,
  extensions: [Migrator],
  logger: logger.log.bind(logger),
});
