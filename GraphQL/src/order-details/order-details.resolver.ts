import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { OrderDetail } from './order-detail.entity';
import { OrderDetailsService } from './order-details.service';

@Resolver(() => OrderDetail)
export class OrderDetailsResolver {
  constructor(private readonly orderDetailsService: OrderDetailsService) {}

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
}
