import {
  Resolver,
  Query,
  Args,
  Int,
  ResolveField,
  Parent,
  Info,
} from '@nestjs/graphql';
import { OrderDetail } from './order-detail.entity';
import { OrderDetailsService } from './order-details.service';
import { Product } from 'src/products/product.entity';
import { GraphQLResolveInfo } from 'graphql';
import { ProductLoader } from 'src/products/product.loader';
import { Inject } from '@nestjs/common';

@Resolver(() => OrderDetail)
export class OrderDetailsResolver {
  constructor(
    private readonly orderDetailsService: OrderDetailsService,
    @Inject(ProductLoader) private readonly productLoader: ProductLoader,
  ) {}

  @Query(() => [OrderDetail], { name: 'orderDetails' })
  async getOrderDetails(
    @Args('orderId', { type: () => Int }) orderId: number,
  ): Promise<OrderDetail[]> {
    return this.orderDetailsService.findMany(orderId);
  }

  @Query(() => OrderDetail, { name: 'orderDetail' })
  async getOrderDetail(
    @Args('orderId', { type: () => Int }) orderId: number,
  ): Promise<OrderDetail[]> {
    return this.orderDetailsService.findMany(orderId);
  }

  @ResolveField(() => Product, { name: 'product' })
  async getProduct(
    @Parent() orderDetail: OrderDetail,
    @Info() info: GraphQLResolveInfo,
  ): Promise<Product> {
    // console.log('OrderDetailsResolver.getProduct');
    if (orderDetail.product) {
      return orderDetail.product;
    }
    // return this.orderDetailsService.findProduct(orderDetail.product_id, info);
    return this.productLoader.batchProducts.load(orderDetail.product_id);
  }
}
