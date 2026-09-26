# Nest.js Backend integrated with Micro-Orm and Postgres

This is an example of a backend implemented with nest.js, micro-orm and postgres. 

It has a periodic process that retrieves the price of bitcoin in euros and updates the database. 

It provides a GET/pair-prices/:pair-name endpoint to fetch the value stored in the database.
The currently supported pair is "btceur" 


# Installation Instuctions

use the latest stable node version: 

```bash
nvm use 20.17.0
```

Create a new nest project

```bash
npx @nestjs/cli new 
```

Create a new resource for the pair prices: 

```bash
cd <project-name>
npx @nestjs/cli generate resource pair-prices
```

Install nestjs/schedule and nestjs/axios libraries

```bash
npm install --save @nestjs/axios @nestjs/schedule
```

## Mikro-orm framework

Install the needed packages for micro-orm

```bash
npm install --save @mikro-orm/core @mikro-orm/nestjs @mikro-orm/postgresql

npm install --save-dev @mikro-orm/cli @mikro-orm/entity-generator @mikro-orm/migrations
```

add the config section to package.json, in devDependdencies: 

```javascript
  "mikro-orm": {
    "useTsNode": true,
    "configPaths": [
      "./src/mikro-orm.config.ts",
      "./dist/mikro-orm.config.js"
    ]
  }
```

Create config file in src/mikro-orm.config.ts

```javascript
import { Logger } from '@nestjs/common';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { defineConfig } from '@mikro-orm/mysql';
import { Author, BaseEntity, Book, BookTag, Publisher } from './entities';

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
```

Add env variable to allow global EntityManager
export MIKRO_ORM_ALLOW_GLOBAL_CONTEXT=true

Docker
To create an image, just 

```bash
docker build -t backend-btc-nest . 
```

To run the container

```bash
docker run --name backend-btc -p 3000:3000 -e MIKRO_ORM_ALLOW_GLOBAL_CONTEXT=true -d --rm backend-btc-nest
```

# Implementation sketch 

## Scheduler

This module periodically gets the BTC-EUR price from coingecko and updates the database. 

See [scheduling nest documentation](https://docs.nestjs.com/techniques/task-scheduling) for details. 

See coin-refresh module (binder + coin-refresh.service.ts + btc-refresh.dto.ts + coin-refresh.module.ts)

Check that ScheduleModule and CoinRefreshModule modules in the app.module.ts file: 

```javascript
  imports: [
    ScheduleModule.forRoot(),
    CoinRefreshModule,
    PairPricesModule,
  ],
```

In coin-refresh.module.ts, import the HttpModule from @nestjs/axios and add it to the imports: [HttpModuleHttpModule] param. 

## Pair-prices 

This module provides the API-Rest to fetch the pair prices from the database. 

## Repository

Thjs module provides persistency to the data. It makes use of Micro-Orm to interact with the postgres database. 


# Migrations

Micro-Orm provides the following commands to handle the migrations

```bash
npx mikro-orm migration:create   # Create new migration with current schema diff
npx mikro-orm migration:up       # Migrate up to the latest version
npx mikro-orm migration:down     # Migrate one step down
npx mikro-orm migration:list     # List all executed migrations
npx mikro-orm migration:check    # Check if schema is up to date
npx mikro-orm migration:pending  # List all pending migrations
npx mikro-orm migration:fresh    # Drop the database and migrate up to the latest version
```

Use :create to start from scratch, and then :up to migrate to subsequent versions when changes in the schema occur.

Enjoy!!
