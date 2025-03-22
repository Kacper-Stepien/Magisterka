import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderDetail } from './order-detail.entity';
import { GraphQLResolveInfo } from 'graphql';
import { Product } from 'src/products/product.entity';
import { parseResolveInfo } from 'graphql-parse-resolve-info';

@Injectable()
export class OrderDetailsService {
  constructor(
    @InjectRepository(OrderDetail)
    private readonly orderDetailsRepository: Repository<OrderDetail>,
  ) {}

  async findOne(orderId: number, productId: number): Promise<OrderDetail> {
    const orderDetail = await this.orderDetailsRepository.findOneBy({
      order_id: orderId,
      product_id: productId,
    });
    if (!orderDetail) {
      throw new NotFoundException(
        `OrderDetail for order ${orderId} and product ${productId} not found`,
      );
    }
    return orderDetail;
  }

  async findMany(orderId: number): Promise<OrderDetail[]> {
    return this.orderDetailsRepository.find({
      where: { order_id: orderId },
    });
  }

  async findAll(): Promise<OrderDetail[]> {
    return this.orderDetailsRepository.find();
  }

  async findProduct(
    productId: number,
    info: GraphQLResolveInfo,
  ): Promise<Product> {
    // Parsujemy obiekt info, aby wyodrębnić żądane pola dla typu Product.
    const parsedInfo = parseResolveInfo(info) as any;
    // console.log(`Parsed info: ${parsedInfo}`);
    // Zakładamy, że typ Product w schemacie nazywa się "Product".
    const productFields = parsedInfo.fieldsByTypeName?.Product;
    // console.log(`Product fields: ${productFields}`);
    const requestedKeys: string[] = productFields
      ? Object.keys(productFields)
      : ['product_id'];
    // console.log(`Requested keys: ${requestedKeys}`);
    // Mapujemy klucze na aliasy, zakładając, że nazwy pól GraphQL odpowiadają kolumnom w tabeli
    const selectFields = requestedKeys.map((key) => `product.${key}`);

    // Używamy menedżera (manager) z repozytorium, aby stworzyć QueryBuilder dla encji Product.
    const product = await this.orderDetailsRepository.manager
      .createQueryBuilder(Product, 'product')
      .select(selectFields)
      .where('product.product_id = :id', { id: productId })
      .getOne();

    if (!product) {
      throw new NotFoundException(`Product with id ${productId} not found`);
    }
    return product;
  }
}
