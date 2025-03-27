import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateOrderInput {
  @Field(() => String)
  customer_id: string;

  @Field(() => Int)
  employee_id: number;

  @Field(() => Date)
  order_date: Date;

  @Field(() => Date)
  required_date: Date;

  @Field(() => Date, { nullable: true })
  shipped_date?: Date;

  @Field(() => Int)
  ship_via: number;

  @Field(() => Number)
  freight: number;

  @Field()
  ship_name: string;

  @Field()
  ship_address: string;

  @Field()
  ship_city: string;

  @Field({ nullable: true })
  ship_region?: string;

  @Field()
  ship_postal_code: string;

  @Field()
  ship_country: string;
}
