import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Order } from 'src/orders/order.entity';
import { Product } from 'src/products/product.entity';

@ObjectType()
@Entity({ name: 'order_details' })
export class OrderDetail {
  @Field(() => Int)
  @PrimaryColumn()
  order_id: number;

  @Field(() => Int)
  @PrimaryColumn()
  product_id: number;

  @Field(() => Float)
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  unit_price: number;

  @Field(() => Int)
  @Column()
  quantity: number;

  @Field(() => Float)
  @Column({ type: 'real' })
  discount: number;

  @Field(() => Order)
  @ManyToOne(() => Order, (order) => order.orderDetails, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @Field(() => Product)
  @ManyToOne(() => Product, (product) => product.orderDetails)
  @JoinColumn({ name: 'product_id' })
  product: Product;
}
