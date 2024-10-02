import { Injectable, Logger } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { IBtcEurDto } from './btc-eur.dto';
import { RepositoryService } from 'src/repository/repository.service';
import { Pair } from 'src/entities/pair.entity';

@Injectable()
export class CoinRefreshService {
  private readonly logger = new Logger(CoinRefreshService.name);

  constructor(
    private httpService: HttpService,
    private repositoryService: RepositoryService,
) {}

  @Interval(30000)
  async handleInterval() {
    this.logger.debug('Called every 10 seconds');
    const data = await this.getBtcPrice();
    this.logger.debug(`BTC price: ${data.bitcoin.eur}`);
    await this.updateBtcPrice(data);
  }

  async getBtcPrice(): Promise<IBtcEurDto> {
    const btcPriceUrl = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=eur';

    const response = await firstValueFrom(this.httpService.get(btcPriceUrl));

    this.logger.log(`Received BTC price: ${JSON.stringify(response.data)}`);

    return response.data;
  }

  async updateBtcPrice(data: IBtcEurDto): Promise<void> {
    this.logger.log(`About to create Pair instance with BTC price: ${data.bitcoin.eur}`);
    const pair = new Pair({
        name: 'btceur',
        base: 'BTC',
        quote: 'EUR',
        price: data.bitcoin.eur,
        updatedAt: new Date(),
    });
    
    this.logger.log(`Pair instance created: ${JSON.stringify(pair)}`);

    await this.repositoryService.createOrUpdate(pair);
  }
}