// src/suppliers/entities/supplier.entity.ts
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { Product } from 'src/products/product.entity';

@ObjectType()
@Entity({ name: 'suppliers' })
export class Supplier {
  @Field(() => Int)
  @PrimaryColumn()
  supplier_id: number;

  @Field()
  @Column()
  company_name: string;

  @Field()
  @Column()
  contact_name: string;

  @Field()
  @Column()
  contact_title: string;

  @Field()
  @Column()
  address: string;

  @Field()
  @Column()
  city: string;

  @Field(() => String, { nullable: true })
  @Column()
  region: string;

  @Field()
  @Column()
  postal_code: string;

  @Field()
  @Column()
  country: string;

  @Field()
  @Column()
  phone: string;

  @Field(() => String, { nullable: true })
  @Column()
  fax: string;

  @Field(() => String, { nullable: true })
  @Column()
  homepage: string;

  @Field(() => [Product], { nullable: true }) // jeśli nie zawsze chcesz je pobierać
  @OneToMany(() => Product, (product) => product.supplier)
  products: Product[];
}
