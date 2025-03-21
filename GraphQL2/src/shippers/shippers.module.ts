import { Module } from '@nestjs/common';
import { ShippersService } from './shippers.service';
import { ShippersResolver } from './shippers.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shipper } from './shipper.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Shipper])],
  providers: [ShippersService, ShippersResolver],
})
export class ShippersModule {}
