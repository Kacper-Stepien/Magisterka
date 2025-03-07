import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}

  async findOne(id: number): Promise<Product> {
    return this.productsRepository.findOneBy({ product_id: id });
  }

  async findAll(): Promise<Product[]> {
    return this.productsRepository.find();
  }

  async create(productData: Partial<Product>): Promise<Product> {
    const newProduct = this.productsRepository.create(productData);
    return this.productsRepository.save(newProduct);
  }

  async update(id: number, updateData: Partial<Product>): Promise<Product> {
    await this.productsRepository.update({ product_id: id }, updateData);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.productsRepository.delete({ product_id: id });
  }
}
