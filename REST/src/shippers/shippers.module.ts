import { Module } from '@nestjs/common';
import { ShippersService } from './shippers.service';
import { ShippersController } from './shippers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shipper } from './shipper.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Shipper])],
  controllers: [ShippersController],
  providers: [ShippersService],
})
export class ShippersModule {}
