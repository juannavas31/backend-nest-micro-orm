import { Injectable, Logger } from '@nestjs/common';
import { EntityRepository, EntityManager, wrap } from '@mikro-orm/postgresql';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Pair } from 'src/entities/pair.entity';

@Injectable()
export class RepositoryService {
  private readonly logger = new Logger(RepositoryService.name);

  constructor(
    @InjectRepository(Pair) private readonly pairRepository: EntityRepository<Pair>,
    private readonly em: EntityManager,
  ) { }

  async findByName(name: string): Promise<Pair> {
    return this.pairRepository.findOne({name});
  }

  async createOrUpdate(pair: Pair): Promise<Pair> {
    let managedPair = await this.pairRepository.findOne({name: pair.name});

    this.logger.log(`Managed pair ${JSON.stringify(managedPair)}`);

    if (managedPair) {
        this.logger.log(`Updating pair with value: ${pair.price}`);
        wrap(managedPair).assign(pair);
    //   managedPair.price = pair.price;
    //   managedPair.updatedAt = pair.updatedAt;
        await this.em.flush();
        this.logger.log(`Pair updated: ${JSON.stringify(managedPair)}`);
    } else {
        this.logger.log(`Creating pair with value: ${pair.price}`);

        managedPair = new Pair(pair);
        managedPair.createdAt = new Date();
        this.em.persist(managedPair);
        await this.em.flush();
    }

    return managedPair;
  }
}
