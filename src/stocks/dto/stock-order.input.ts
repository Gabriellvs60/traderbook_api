import { InputType, registerEnumType } from '@nestjs/graphql';
import { Order } from 'src/common/order/order';

export enum StockOrderField {
  id = 'id',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
  name = 'name',
  symbol = 'symbol',
}

registerEnumType(StockOrderField, {
  name: 'StockOrderField',
  description: 'Properties by which stock connections can be ordered.',
});

@InputType()
export class StockOrder extends Order {
  field: StockOrderField;
}
