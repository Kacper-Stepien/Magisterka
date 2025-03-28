import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { OrdersModule } from './orders/orders.module';
import { OrderDetailsModule } from './order-details/order-details.module';
import { ProductsModule } from './products/products.module';
import { ShippersModule } from './shippers/shippers.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDetail } from './order-details/order-detail.entity';
import { Order } from './orders/order.entity';
import { Product } from './products/product.entity';
import { Shipper } from './shippers/shipper.entity';
import { SuppliersModule } from './suppliers/suppliers.module';
import { Supplier } from './suppliers/supplier.entity';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/schema.qql',
      playground: true,
      debug: true,
    }),
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
      // extra: {
      //   max: 30, // lub 50, zależnie od liczby workerów i intensywności
      // },
    }),
    OrdersModule,
    OrderDetailsModule,
    ProductsModule,
    ShippersModule,
    SuppliersModule,
  ],
  providers: [AppService],
})
export class AppModule {}
