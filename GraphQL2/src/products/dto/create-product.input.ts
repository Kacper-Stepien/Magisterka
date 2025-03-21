import { InputType, Field, Int, Float } from '@nestjs/graphql';

@InputType()
export class CreateProductInput {
  @Field()
  product_name: string;

  @Field(() => Int)
  supplier_id: number;

  @Field(() => Int)
  category_id: number;

  @Field()
  quantity_per_unit: string;

  @Field(() => Float)
  unit_price: number;

  @Field(() => Int)
  units_in_stock: number;

  @Field(() => Int)
  units_on_order: number;

  @Field(() => Int)
  reorder_level: number;

  @Field(() => Int)
  discontinued: number;
}
