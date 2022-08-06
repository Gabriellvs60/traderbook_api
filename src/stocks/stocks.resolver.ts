import { PrismaService } from 'nestjs-prisma';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { Stock } from './models/stock.model';
import { CreateStockInput } from './dto/createStock.input';

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
}
