import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'shippers' })
export class Shipper {
  @PrimaryGeneratedColumn()
  shipper_id: number;

  @Column()
  company_name: string;

  @Column()
  phone: string;
}
