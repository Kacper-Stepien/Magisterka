import { OrderDetail } from 'src/order-details/order-detail.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  order_id: number;

  @Column()
  customer_id: string;

  @Column()
  employee_id: number;

  @Column({ type: 'date' })
  order_date: Date;

  @Column({ type: 'date', nullable: true })
  required_date: Date;

  @Column({ type: 'date', nullable: true })
  shipped_date: Date;

  @Column()
  ship_via: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  freight: number;

  @Column()
  ship_name: string;

  @Column()
  ship_address: string;

  @Column()
  ship_city: string;

  @Column({ nullable: true })
  ship_region: string;

  @Column({ nullable: true })
  ship_postal_code: string;

  @Column()
  ship_country: string;

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.order)
  orderDetails: OrderDetail[];
}
