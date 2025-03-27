// src/suppliers/suppliers.resolver.ts
import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { SuppliersService } from './suppliers.service';
import { Supplier } from './supplier.entity';

@Resolver(() => Supplier)
export class SuppliersResolver {
  constructor(private readonly suppliersService: SuppliersService) {}

  @Query(() => Supplier, { name: 'supplier' })
  async getSupplier(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Supplier> {
    return this.suppliersService.findOne(id);
  }

  @Query(() => [Supplier], { name: 'suppliers' })
  async getAllSuppliers(): Promise<Supplier[]> {
    return this.suppliersService.findAll();
  }
}
