import {
  Resolver,
  Query,
  Args,
  Int,
  Info,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { OrdersService } from './orders.service';
import { Order } from './order.entity';
import { GraphQLResolveInfo } from 'graphql';
import { OrderDetail } from 'src/order-details/order-detail.entity';

@Resolver(() => Order)
export class OrdersResolver {
  constructor(private readonly ordersService: OrdersService) {}

  @Query(() => Order, { name: 'order' })
  async getOrder(
    @Args('id', { type: () => Int }) id: number,
    @Info() info: GraphQLResolveInfo,
  ): Promise<Order> {
    // console.log('OrderResolver.getOrder');
    return this.ordersService.findOne(id, info);
  }

  @Query(() => [Order], { name: 'orders' })
  async getOrders(
    @Args('page', { type: () => Int, defaultValue: 1 }) page: number,
    @Args('limit', { type: () => Int, defaultValue: 10 }) limit: number,
    @Info() info: GraphQLResolveInfo,
  ): Promise<Order[]> {
    // console.log('OrderResolver.getOrders');
    return this.ordersService.findMany(page, limit, info);
  }

  @ResolveField(() => [OrderDetail], { name: 'orderDetails' })
  async getOrderDetails(
    @Parent() order: Order,
    @Info() info: GraphQLResolveInfo,
  ): Promise<OrderDetail[]> {
    // console.log('OrderResolver.getOrderDetails');
    if (order.orderDetails) {
      return order.orderDetails;
    }
    return this.ordersService.findOrderDetailsForOrder(order.order_id, info);
  }

  // @Query(() => Order, { name: 'orderWithDetails' })
  // async getOrderWithDetails(
  //   @Args('id', { type: () => Int }) id: number,
  // ): Promise<Order> {
  //   return this.ordersService.findOneWithDetails(id);
  // }

  // @Query(() => Order, { name: 'orderFull' })
  // async getOrderFull(
  //   @Args('id', { type: () => Int }) id: number,
  // ): Promise<Order> {
  //   return this.ordersService.findOneWithDetailsAndProducts(id);
  // }

  // // Optymalizacja zapytania ////////////////////////////////////////////////////////////////////////////
  // @Query(() => Order, { name: 'orderOptimized' })
  // async getOrderOptimized(
  //   @Args('id', { type: () => Int }) id: number,
  //   @Info() info: GraphQLResolveInfo,
  // ): Promise<Order> {
  //   return this.ordersService.findOneOptimized(id, info);
  // }

  // @Query(() => [Order], { name: 'ordersOptimized' })
  // async getOrdersOptimized(
  //   @Args('page', { type: () => Int, defaultValue: 1 }) page: number,
  //   @Args('limit', { type: () => Int, defaultValue: 10 }) limit: number,
  //   @Info() info: GraphQLResolveInfo,
  // ): Promise<Order[]> {
  //   return this.ordersService.findManyOptimized(page, limit, info);
  // }

  // @Query(() => Order, { name: 'orderWithDetailsOptimized' })
  // async getOrderWithDetailsOptimized(
  //   @Args('id', { type: () => Int }) id: number,
  //   @Info() info: GraphQLResolveInfo,
  // ): Promise<Order> {
  //   return this.ordersService.findOneWithDetailsOptimized(id, info);
  // }

  // @Query(() => Order, { name: 'orderFullOptimized' })
  // async getOrderFullOptimized(
  //   @Args('id', { type: () => Int }) id: number,
  //   @Info() info: GraphQLResolveInfo,
  // ): Promise<Order> {
  //   return this.ordersService.findOneWithDetailsAndProductsOptimized(id, info);
  // }
}
