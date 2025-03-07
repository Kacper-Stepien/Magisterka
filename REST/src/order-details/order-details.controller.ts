import { Controller, Get, Param } from '@nestjs/common';
import { OrderDetailsService } from './order-details.service';
import { OrderDetail } from './order-detail.entity';

@Controller('order-details')
export class OrderDetailsController {
  constructor(private readonly orderDetailsService: OrderDetailsService) {}

  @Get()
  async getAll(): Promise<OrderDetail[]> {
    return this.orderDetailsService.findAll();
  }

  @Get(':orderId')
  async getMany(@Param('orderId') orderId: string): Promise<OrderDetail[]> {
    return this.orderDetailsService.findMany(+orderId);
  }

  @Get(':orderId/:productId')
  async getOne(
    @Param('orderId') orderId: string,
    @Param('productId') productId: string,
  ): Promise<OrderDetail> {
    return this.orderDetailsService.findOne(+orderId, +productId);
  }
}


