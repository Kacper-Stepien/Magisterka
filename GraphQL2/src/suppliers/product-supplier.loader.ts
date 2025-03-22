// src/products/loaders/product-supplier.loader.ts
import * as DataLoader from 'dataloader';
import { Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Supplier } from './supplier.entity';
import { Repository } from 'typeorm';

@Injectable({ scope: Scope.REQUEST })
export class ProductSupplierLoader {
  constructor(
    @InjectRepository(Supplier)
    private readonly supplierRepository: Repository<Supplier>,
  ) {}

  public readonly batchSuppliers = new DataLoader<number, Supplier>(
    async (supplierIds: number[]) => {
      const suppliers = await this.supplierRepository.findByIds(supplierIds);

      const supplierMap = new Map<number, Supplier>();
      suppliers.forEach((supplier) => {
        supplierMap.set(supplier.supplier_id, supplier);
      });

      return supplierIds.map((id) => supplierMap.get(id));
    },
  );
}
