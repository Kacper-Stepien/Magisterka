import { Module } from '@nestjs/common';
import { SuppliersService } from './suppliers.service';
import { SuppliersResolver } from './suppliers.resolver';
import { ProductSupplierLoader } from './product-supplier.loader';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Supplier } from './supplier.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Supplier])],
  providers: [SuppliersService, SuppliersResolver, ProductSupplierLoader],
  exports: [ProductSupplierLoader, TypeOrmModule],
})
export class SuppliersModule {}
