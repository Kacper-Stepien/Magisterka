import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>,
  ) {}

  async findOne(id: number): Promise<Order> {
    const order = await this.ordersRepository.findOneBy({ order_id: id });
    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }
    return order;
  }

  async findMany(page: number, limit: number): Promise<Order[]> {
    const orders = await this.ordersRepository.find({
      take: limit,
      skip: (page - 1) * limit,
    });
    if (!orders || orders.length === 0) {
      throw new NotFoundException(
        `No orders found for page ${page} with limit ${limit}`,
      );
    }
    return orders;
  }

  async findOneWithDetails(id: number): Promise<Order> {
    const order = await this.ordersRepository.findOne({
      where: { order_id: id },
      relations: ['orderDetails'],
    });
    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }
    return order;
  }

  async findOneWithDetailsAndProducts(id: number): Promise<Order> {
    const order = await this.ordersRepository.findOne({
      where: { order_id: id },
      relations: ['orderDetails', 'orderDetails.product'],
    });
    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }
    return order;
  }

  async findOneWithAll(id: number): Promise<Order> {
    const order = await this.ordersRepository.findOne({
      where: { order_id: id },
      relations: [
        'orderDetails',
        'orderDetails.product',
        'orderDetails.product.supplier',
      ],
    });

    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }

    return order;
  }
}
