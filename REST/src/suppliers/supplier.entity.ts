import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { Product } from '../products/product.entity';

@Entity('suppliers')
export class Supplier {
  @PrimaryColumn()
  supplier_id: number;

  @Column()
  company_name: string;

  @Column()
  contact_name: string;

  @Column()
  contact_title: string;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column({ nullable: true })
  region: string;

  @Column()
  postal_code: string;

  @Column()
  country: string;

  @Column()
  phone: string;

  @Column({ nullable: true })
  fax: string;

  @Column({ nullable: true })
  homepage: string;

  @OneToMany(() => Product, (product) => product.supplier)
  products: Product[];
}
