import { Module } from '@nestjs/common';
import { OrderDetailsService } from './order-details.service';
import { OrderDetailsController } from './order-details.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDetail } from './order-detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderDetail])],
  controllers: [OrderDetailsController],
  providers: [OrderDetailsService],
})
export class OrderDetailsModule {}
