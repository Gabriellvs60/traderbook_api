import { Module } from '@nestjs/common';
import { StocksResolver } from './stocks.resolver';
import { StocksService } from './stocks.service';

@Module({
  imports: [],
  providers: [StocksResolver, StocksService],
})
export class StocksModule {}
