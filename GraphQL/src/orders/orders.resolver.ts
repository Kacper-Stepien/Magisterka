import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { OrdersService } from './orders.service';
import { Order } from './order.entity';

@Resolver(() => Order)
export class OrdersResolver {
  constructor(private readonly ordersService: OrdersService) {}

  @Query(() => Order, { name: 'order' })
  async getOrder(@Args('id', { type: () => Int }) id: number): Promise<Order> {
    return this.ordersService.findOne(id);
  }

  @Query(() => [Order], { name: 'orders' })
  async getOrders(
    @Args('page', { type: () => Int, defaultValue: 1 }) page: number,
    @Args('limit', { type: () => Int, defaultValue: 10 }) limit: number,
  ): Promise<Order[]> {
    return this.ordersService.findMany(page, limit);
  }

  @Query(() => Order, { name: 'orderWithDetails' })
  async getOrderWithDetails(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Order> {
    return this.ordersService.findOneWithDetails(id);
  }

  @Query(() => Order, { name: 'orderFull' })
  async getOrderFull(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Order> {
    return this.ordersService.findOneWithDetailsAndProducts(id);
  }
}
