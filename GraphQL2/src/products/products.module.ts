import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsResolver } from './products.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { ProductLoader } from './product.loader';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  providers: [ProductsService, ProductsResolver, ProductLoader],
  exports: [ProductLoader],
})
export class ProductsModule {}
