import { Controller, Get, Param } from '@nestjs/common';
import { SuppliersService } from './suppliers.service';
import { Supplier } from './supplier.entity';

@Controller('suppliers')
export class SuppliersController {
  constructor(private readonly suppliersService: SuppliersService) {}

  @Get(':id')
  getSupplier(@Param('id') id: number): Promise<Supplier> {
    return this.suppliersService.findOne(id);
  }
}
