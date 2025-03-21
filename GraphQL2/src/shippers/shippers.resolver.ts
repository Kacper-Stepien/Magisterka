import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { Shipper } from './shipper.entity';
import { ShippersService } from './shippers.service';

@Resolver(() => Shipper)
export class ShippersResolver {
  constructor(private readonly shippersService: ShippersService) {}

  @Query(() => [Shipper], { name: 'shippers' })
  async getShippers(): Promise<Shipper[]> {
    return this.shippersService.findAll();
  }

  @Query(() => Shipper, { name: 'shipper' })
  async getShipper(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Shipper> {
    return this.shippersService.findOne(id);
  }
}
