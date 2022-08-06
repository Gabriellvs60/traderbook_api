import { PrismaService } from 'nestjs-prisma';
import { Injectable } from '@nestjs/common';
import { CreateStockInput } from './dto/createStock.input';

@Injectable()
export class StocksService {
  constructor(private prisma: PrismaService) {}

  async createStock(data: CreateStockInput) {
    const result = await this.prisma.stock.create({
      data,
    });
    return result;
  }
}
