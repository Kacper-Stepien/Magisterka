import { Controller, Get, Param, Query } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from './order.entity';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get(':id')
  async getOrder(@Param('id') id: string): Promise<Order> {
    return this.ordersService.findOne(+id);
  }

  @Get()
  async getOrders(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
  ): Promise<Order[]> {
    return this.ordersService.findMany(+page, +limit);
  }
}
