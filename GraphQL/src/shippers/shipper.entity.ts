import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity({ name: 'shippers' })
export class Shipper {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  shipper_id: number;

  @Field()
  @Column()
  company_name: string;

  @Field()
  @Column()
  phone: string;
}
