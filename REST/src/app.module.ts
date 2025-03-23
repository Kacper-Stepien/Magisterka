import { Order } from './orders/order.entity';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersModule } from './orders/orders.module';
import { OrderDetailsModule } from './order-details/order-details.module';
import { OrderDetail } from './order-details/order-detail.entity';
import { ShippersModule } from './shippers/shippers.module';
import { Shipper } from './shippers/shipper.entity';
import { ProductsModule } from './products/products.module';
import { Product } from './products/product.entity';
import { SuppliersModule } from './suppliers/suppliers.module';
import { Supplier } from './suppliers/supplier.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'kacper',
      database: 'magisterka',
      entities: [Order, OrderDetail, Shipper, Product, Supplier],
      synchronize: false,
      logging: false,
      extra: {
        connectionLimit: 1000,
      },
    }),
    OrdersModule,
    OrderDetailsModule,
    ShippersModule,
    ProductsModule,
    SuppliersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
