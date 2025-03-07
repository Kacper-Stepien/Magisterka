import { ObjectType, Field, Int, GraphQLISODateTime } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { OrderDetail } from 'src/order-details/order-detail.entity';

@ObjectType()
@Entity('orders')
export class Order {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  order_id: number;

  @Field()
  @Column()
  customer_id: string;

  @Field(() => Int)
  @Column()
  employee_id: number;

  @Field(() => GraphQLISODateTime)
  @Column({
    type: 'date',
    transformer: {
      from: (value: string) => (value ? new Date(value) : null),
      to: (value: Date) => value,
    },
  })
  order_date: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @Column({
    type: 'date',
    transformer: {
      from: (value: string) => (value ? new Date(value) : null),
      to: (value: Date) => value,
    },
  })
  required_date: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @Column({
    type: 'date',
    transformer: {
      from: (value: string) => (value ? new Date(value) : null),
      to: (value: Date) => value,
    },
  })
  shipped_date: Date;

  @Field(() => Int)
  @Column()
  ship_via: number;

  @Field()
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  freight: number;

  @Field()
  @Column()
  ship_name: string;

  @Field()
  @Column()
  ship_address: string;

  @Field()
  @Column()
  ship_city: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  ship_region: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  ship_postal_code: string;

  @Field()
  @Column()
  ship_country: string;

  @Field(() => [OrderDetail], { nullable: 'itemsAndList' })
  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.order)
  orderDetails: OrderDetail[];
}
