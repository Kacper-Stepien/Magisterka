import { ObjectType } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity({ name: 'shippers' })
export class Shipper {
  @PrimaryGeneratedColumn()
  shipper_id: number;

  @Column()
  company_name: string;

  @Column()
  phone: string;
}
