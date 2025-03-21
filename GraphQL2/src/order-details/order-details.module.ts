import { Module } from '@nestjs/common';
import { OrderDetailsService } from './order-details.service';
import { OrderDetailsResolver } from './order-details.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDetail } from './order-detail.entity';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [TypeOrmModule.forFeature([OrderDetail]), ProductsModule],
  providers: [OrderDetailsService, OrderDetailsResolver],
})
export class OrderDetailsModule {}
