import { Injectable } from '@nestjs/common';
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
    return this.orderDetailsRepository.findOneBy({
      order_id: orderId,
      product_id: productId,
    });
  }

  async findMany(orderId: number): Promise<OrderDetail[]> {
    return this.orderDetailsRepository.find({
      where: {
        order_id: orderId,
      },
    });
  }

  async findAll(): Promise<OrderDetail[]> {
    return this.orderDetailsRepository.find();
  }
}
