import { ObjectType } from '@nestjs/graphql';
import PaginatedResponse from 'src/common/pagination/pagination';
import { Stock } from './stock.model';

@ObjectType()
export class StockConnection extends PaginatedResponse(Stock) {}
