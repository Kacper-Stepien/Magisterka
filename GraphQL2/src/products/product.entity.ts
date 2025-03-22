import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { OrderDetail } from 'src/order-details/order-detail.entity';
import { Supplier } from 'src/suppliers/supplier.entity';

@ObjectType()
@Entity({ name: 'products' })
export class Product {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  product_id: number;

  @Field()
  @Column()
  product_name: string;

  @Field(() => Int)
  @Column()
  supplier_id: number;

  @Field(() => Int)
  @Column()
  category_id: number;

  @Field()
  @Column()
  quantity_per_unit: string;

  @Field(() => Float)
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  unit_price: number;

  @Field(() => Int)
  @Column()
  units_in_stock: number;

  @Field(() => Int)
  @Column()
  units_on_order: number;

  @Field(() => Int)
  @Column()
  reorder_level: number;

  @Field(() => Int)
  @Column()
  discontinued: number;

  @Field(() => [OrderDetail], { nullable: 'itemsAndList' })
  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.product)
  orderDetails: OrderDetail[];

  @ManyToOne(() => Supplier, (supplier) => supplier.products)
  @JoinColumn({ name: 'supplier_id' })
  supplier: Supplier;
}
