import { IsNotEmpty } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateStockInput {
  @Field()
  @IsNotEmpty()
  symbol: string;

  @Field()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsNotEmpty()
  category: string;

  @Field()
  @IsNotEmpty()
  type: string;

  @Field()
  @IsNotEmpty()
  cnpj: string;
}
