import { ObjectType } from '@nestjs/graphql';
import { BaseModel } from 'src/common/models/base.model';

@ObjectType()
export class Stock extends BaseModel {
  symbol: string;
  name: string;
  category: string;
  type: string;
  cnpj: string;
}
