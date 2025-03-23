import { Controller, Get, Param, Query } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from './order.entity';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  async getOrders(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
  ): Promise<Order[]> {
    return this.ordersService.findMany(+page, +limit);
  }

  @Get(':id/details')
  async getOrderWithDetails(@Param('id') id: string): Promise<Order> {
    return this.ordersService.findOneWithDetails(+id);
  }

  @Get(':id/full-details')
  async getOrderWithDetailsAndProducts(
    @Param('id') id: string,
  ): Promise<Order> {
    return this.ordersService.findOneWithDetailsAndProducts(+id);
  }

  @Get(':id/with-suppliers')
  async getOrderWithAllData(@Param('id') id: string): Promise<Order> {
    return this.ordersService.findOneWithAll(+id);
  }

  @Get(':id')
  async getOrder(@Param('id') id: string): Promise<Order> {
    return this.ordersService.findOne(+id);
  }
}
