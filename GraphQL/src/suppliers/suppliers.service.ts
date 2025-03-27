// src/suppliers/suppliers.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Supplier } from './supplier.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SuppliersService {
  constructor(
    @InjectRepository(Supplier)
    private readonly supplierRepository: Repository<Supplier>,
  ) {}

  async findOne(id: number): Promise<Supplier> {
    const supplier = await this.supplierRepository.findOneBy({
      supplier_id: id,
    });
    if (!supplier) {
      throw new NotFoundException(`Supplier with id ${id} not found`);
    }
    return supplier;
  }

  async findAll(): Promise<Supplier[]> {
    return this.supplierRepository.find();
  }
}
