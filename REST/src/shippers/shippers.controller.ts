import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ShippersService } from './shippers.service';
import { Shipper } from './shipper.entity';

@Controller('shippers')
export class ShippersController {
  constructor(private readonly shippersService: ShippersService) {}

  @Get(':id')
  async getOne(@Param('id') id: string): Promise<Shipper> {
    return this.shippersService.findOne(+id);
  }

  @Get()
  async getAll(): Promise<Shipper[]> {
    return this.shippersService.findAll();
  }

  @Post()
  async create(@Body() shipperData: Partial<Shipper>): Promise<Shipper> {
    return this.shippersService.create(shipperData);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateData: Partial<Shipper>,
  ): Promise<Shipper> {
    return this.shippersService.update(+id, updateData);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.shippersService.remove(+id);
  }
}
