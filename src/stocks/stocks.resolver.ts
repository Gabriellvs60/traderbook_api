import { PrismaService } from 'nestjs-prisma';
import { Resolver, Args, Mutation, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { Stock } from './models/stock.model';
import { CreateStockInput } from './dto/createStock.input';
import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { PaginationArgs } from 'src/common/pagination/pagination.args';
import { StockOrder } from './dto/stock-order.input';
import { StockConnection } from './models/stock-connection.model';
import { StockSymbolArgs } from './args/stock-symbol.args';

@Resolver(() => Stock)
export class StocksResolver {
  constructor(private prisma: PrismaService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Stock)
  async createStock(@Args('data') data: CreateStockInput) {
    const newStock = this.prisma.stock.create({
      data: {
        symbol: data.symbol,
        name: data.name,
        category: data.category,
        type: data.type,
        cnpj: data.cnpj,
      },
    });
    return newStock;
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => StockConnection)
  async stocks(
    @Args() { after, before, first, last }: PaginationArgs,
    @Args({ name: 'query', type: () => String, nullable: true })
    query: string,
    @Args({
      name: 'orderBy',
      type: () => StockOrder,
      nullable: true,
    })
    orderBy: StockOrder
  ) {
    const a = await findManyCursorConnection(
      (args) =>
        this.prisma.stock.findMany({
          // where,
          orderBy: orderBy ? { [orderBy.field]: orderBy.direction } : null,
          ...args,
        }),
      () => this.prisma.post.count(),
      { first, last, before, after }
    );
    return a;
  }

  @Query(() => Stock)
  async stockBySymbol(@Args() arg: StockSymbolArgs) {
    return this.prisma.stock.findFirst({ where: { symbol: arg.stockSymbol } });
  }
}
