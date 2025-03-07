import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Shipper } from './shipper.entity';

@Injectable()
export class ShippersService {
  constructor(
    @InjectRepository(Shipper)
    private readonly shippersRepository: Repository<Shipper>,
  ) {}

  async findOne(id: number): Promise<Shipper> {
    return this.shippersRepository.findOneBy({ shipper_id: id });
  }

  async findAll(): Promise<Shipper[]> {
    return this.shippersRepository.find();
  }

  async create(shipperData: Partial<Shipper>): Promise<Shipper> {
    const newShipper = this.shippersRepository.create(shipperData);
    return this.shippersRepository.save(newShipper);
  }

  async update(id: number, updateData: Partial<Shipper>): Promise<Shipper> {
    await this.shippersRepository.update({ shipper_id: id }, updateData);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.shippersRepository.delete({ shipper_id: id });
  }
}
