import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderDetail } from './order-detail.entity';

@Injectable()
export class OrderDetailsService {
  constructor(
    @InjectRepository(OrderDetail)
    private readonly orderDetailsRepository: Repository<OrderDetail>,
  ) {}

  async findOne(orderId: number, productId: number): Promise<OrderDetail> {
    const orderDetail = await this.orderDetailsRepository.findOneBy({
      order_id: orderId,
      product_id: productId,
    });
    if (!orderDetail) {
      throw new NotFoundException(
        `OrderDetail for order ${orderId} and product ${productId} not found`,
      );
    }
    return orderDetail;
  }

  async findMany(orderId: number): Promise<OrderDetail[]> {
    return this.orderDetailsRepository.find({
      where: { order_id: orderId },
    });
  }

  async findAll(): Promise<OrderDetail[]> {
    return this.orderDetailsRepository.find();
  }
}
