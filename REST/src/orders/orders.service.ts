import { Injectable } from '@nestjs/common';
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
    return this.ordersRepository.findOneBy({ order_id: id });
  }

  async findMany(page: number, limit: number): Promise<Order[]> {
    return this.ordersRepository.find({
      take: limit,
      skip: (page - 1) * limit,
    });
  }

  async findOneWithDetails(id: number): Promise<Order> {
    return this.ordersRepository.findOne({
      where: { order_id: id },
      relations: ['orderDetails'],
    });
  }

  async findOneWithDetailsAndProducts(id: number): Promise<Order> {
    return this.ordersRepository.findOne({
      where: { order_id: id },
      relations: ['orderDetails', 'orderDetails.product'], // Pobieramy szczegóły zamówienia i produkty
    });
  }
}
