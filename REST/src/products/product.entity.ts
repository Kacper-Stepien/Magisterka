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

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn()
  product_id: number;

  @Column()
  product_name: string;

  @Column()
  supplier_id: number;

  @Column()
  category_id: number;

  @Column()
  quantity_per_unit: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  unit_price: number;

  @Column()
  units_in_stock: number;

  @Column()
  units_on_order: number;

  @Column()
  reorder_level: number;

  @Column()
  discontinued: number;

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.product)
  orderDetails: OrderDetail[];

  @ManyToOne(() => Supplier, (supplier) => supplier.products)
  @JoinColumn({ name: 'supplier_id' })
  supplier: Supplier;
}
