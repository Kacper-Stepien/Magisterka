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

  findOne(id: number): Promise<Supplier> {
    return this.supplierRepository.findOneBy({ supplier_id: id });
  }
}
