import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsResolver } from './products.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { ProductLoader } from './product.loader';
import { ProductSupplierLoader } from 'src/suppliers/product-supplier.loader';
import { SuppliersModule } from 'src/suppliers/suppliers.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), SuppliersModule],
  providers: [
    ProductsService,
    ProductsResolver,
    ProductLoader,
    ProductSupplierLoader,
  ],
  exports: [ProductLoader],
})
export class ProductsModule {}
