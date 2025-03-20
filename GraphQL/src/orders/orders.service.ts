import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Order } from './order.entity';
import { GraphQLResolveInfo } from 'graphql';
import { parseResolveInfo, ResolveTree } from 'graphql-parse-resolve-info';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>,
  ) {}

  async findOne(id: number): Promise<Order> {
    const order = await this.ordersRepository.findOneBy({ order_id: id });
    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }
    return order;
  }

  async findOrderDetailsForOrder(orderId: number): Promise<any> {
    const order = await this.ordersRepository.findOne({
      where: { order_id: orderId },
      relations: ['orderDetails'],
    });
    if (!order) {
      throw new NotFoundException(`Order with id ${orderId} not found`);
    }
    return order.orderDetails;
  }

  async findMany(page: number, limit: number): Promise<Order[]> {
    const orders = await this.ordersRepository.find({
      take: limit,
      skip: (page - 1) * limit,
    });
    if (!orders || orders.length === 0) {
      throw new NotFoundException(
        `No orders found for page ${page} with limit ${limit}`,
      );
    }
    return orders;
  }

  async findOneWithDetails(id: number): Promise<Order> {
    const order = await this.ordersRepository.findOne({
      where: { order_id: id },
      relations: ['orderDetails'],
    });
    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }
    return order;
  }

  async findOneWithDetailsAndProducts(id: number): Promise<Order> {
    const order = await this.ordersRepository.findOne({
      where: { order_id: id },
      relations: ['orderDetails', 'orderDetails.product'],
    });
    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }
    return order;
  }

  // Optymalizacja zapytania
  // Nowa metoda optymalizowana, która dynamicznie wybiera tylko żądane pola
  async findOneOptimized(id: number, info: GraphQLResolveInfo): Promise<Order> {
    // Parsujemy info przy pomocy graphql-parse-resolve-info
    const parsedInfo = parseResolveInfo(info) as any;
    // Załóżmy, że zapytanie jest zdefiniowane jako "orderOptimized"
    // Uwaga: biblioteka przechowuje pola pod nazwą typu, np. Order (upewnij się, że Twoje @ObjectType() ma poprawną nazwę)
    const requestedFields = parsedInfo.fieldsByTypeName.Order;
    // Jeśli żądanie nie zawiera żadnych pól, ustaw domyślne (np. order_id)
    const fieldKeys: string[] = requestedFields
      ? Object.keys(requestedFields)
      : ['order_id'];

    // Przygotuj listę kolumn dla aliasu 'order'
    const orderSelect = fieldKeys.map((key) => `order.${key}`);

    // Budujemy zapytanie za pomocą QueryBuildera
    const query: SelectQueryBuilder<Order> = this.ordersRepository
      .createQueryBuilder('order')
      .select(orderSelect)
      .where('order.order_id = :id', { id });

    const order = await query.getOne();
    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }
    return order;
  }

  async findManyOptimized(
    page: number,
    limit: number,
    info: GraphQLResolveInfo,
  ): Promise<Order[]> {
    // Parsujemy obiekt info, aby uzyskać żądane pola
    const parsedInfo = parseResolveInfo(info) as any;
    // Dla zapytania zwracającego listę Order, obiekt pól jest zazwyczaj przechowywany pod nazwą Order
    const requestedFields = parsedInfo.fieldsByTypeName.Order;

    // Jeśli nie udało się wyodrębnić pól, ustaw domyślnie tylko order_id
    const fieldKeys: string[] = requestedFields
      ? Object.keys(requestedFields)
      : ['order_id'];

    // Tworzymy listę kolumn dla aliasu 'order'
    const orderSelect = fieldKeys.map((key) => `order.${key}`);

    // Budujemy zapytanie przy użyciu QueryBuildera
    let query: SelectQueryBuilder<Order> = this.ordersRepository
      .createQueryBuilder('order')
      .select(orderSelect)
      .skip((page - 1) * limit)
      .take(limit);

    const orders = await query.getMany();
    if (!orders || orders.length === 0) {
      throw new NotFoundException(
        `No orders found for page ${page} with limit ${limit}`,
      );
    }
    return orders;
  }

  // Nowa metoda optymalizowana, która dynamicznie wybiera tylko żądane pola
  async findOneWithDetailsOptimized(
    id: number,
    info: GraphQLResolveInfo,
  ): Promise<Order> {
    // Parsujemy obiekt info
    const parsedInfo = parseResolveInfo(info) as any;
    // Załóżmy, że klient wysyła zapytanie typu "orderWithDetailsOptimized"
    // Dla głównego typu "Order" pobieramy żądane pola:
    const orderRequested: ResolveTree = parsedInfo.fieldsByTypeName.Order;
    const orderKeys: string[] = orderRequested
      ? Object.keys(orderRequested)
      : ['order_id'];
    // Wykluczamy relację "orderDetails", bo będzie obsługiwana osobno
    const orderSelect = orderKeys
      .filter((key) => key !== 'orderDetails')
      .map((key) => `order.${key}`);

    // Dynamicznie pobierz informacje o zagnieżdżonej relacji orderDetails, jeśli została zażądana
    let orderDetailSelect: string[] = [];
    if (orderRequested && (orderRequested as any).orderDetails) {
      const orderDetailRequested = (orderRequested as any).orderDetails;
      // Upewnij się, że masz dostęp do pól OrderDetail (np. poprzez fieldsByTypeName.OrderDetail)
      const orderDetailKeys: string[] = orderDetailRequested.fieldsByTypeName
        ?.OrderDetail
        ? Object.keys(orderDetailRequested.fieldsByTypeName.OrderDetail)
        : [];
      // Przyjmujemy, że chcesz pobrać tylko te kolumny z OrderDetail, które zostały zażądane
      orderDetailSelect = orderDetailKeys.map((key) => `orderDetail.${key}`);
    }

    // Budujemy zapytanie za pomocą QueryBuildera
    let query: SelectQueryBuilder<Order> = this.ordersRepository
      .createQueryBuilder('order')
      .select(orderSelect)
      // Dołączamy relację orderDetails, ale pobieramy tylko wybrane pola, jeśli zostały zażądane
      .leftJoinAndSelect('order.orderDetails', 'orderDetail')
      // Jeśli orderDetails zostały zażądane, dodajemy wybrane kolumny
      .addSelect(orderDetailSelect)
      .where('order.order_id = :id', { id });

    const order = await query.getOne();
    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }
    return order;
  }

  async findOneWithDetailsAndProductsOptimized(
    id: number,
    info: GraphQLResolveInfo,
  ): Promise<Order> {
    // Parsujemy obiekt info, aby uzyskać strukturę żądanych pól dla typu Order
    const parsedInfo = parseResolveInfo(info) as any;
    const requestedOrderFields: ResolveTree = parsedInfo.fieldsByTypeName.Order;

    // Dla głównego rekordu Order – pobieramy wszystkie żądane pola, z wyjątkiem relacji orderDetails
    const orderKeys: string[] = requestedOrderFields
      ? Object.keys(requestedOrderFields)
      : ['order_id'];
    const orderSelect = orderKeys
      .filter((key) => key !== 'orderDetails')
      .map((key) => `order.${key}`);

    // Dla relacji orderDetails i dla product – budujemy listy dynamicznie
    let orderDetailSelect: string[] = [];
    let productSelect: string[] = [];
    if (requestedOrderFields && (requestedOrderFields as any).orderDetails) {
      // Rzutujemy, aby ominąć ograniczenia typów
      const orderDetailRequested: ResolveTree = (requestedOrderFields as any)
        .orderDetails;
      // Pobieramy pola dla OrderDetail (przyjmujemy, że typ w schemacie nazywa się OrderDetail)
      const orderDetailKeys: string[] = orderDetailRequested.fieldsByTypeName
        ?.OrderDetail
        ? Object.keys(orderDetailRequested.fieldsByTypeName.OrderDetail)
        : [];
      orderDetailSelect = orderDetailKeys
        .filter((key) => key !== 'product')
        .map((key) => `orderDetail.${key}`);

      // Jeśli klient zażądał danych dla relacji product w ramach orderDetails:
      if (
        (orderDetailRequested as any).product &&
        (orderDetailRequested as any).product.fieldsByTypeName?.Product
      ) {
        const productRequested: ResolveTree = (orderDetailRequested as any)
          .product;
        const productKeys: string[] = productRequested.fieldsByTypeName?.Product
          ? Object.keys(productRequested.fieldsByTypeName.Product)
          : [];
        productSelect = productKeys.map((key) => `product.${key}`);
      }
    }

    // Budujemy zapytanie przy użyciu QueryBuildera
    let query: SelectQueryBuilder<Order> = this.ordersRepository
      .createQueryBuilder('order')
      .select(orderSelect)
      // Dołączamy relację orderDetails – używamy leftJoinAndSelect, aby potem móc dodać selekcję pól
      .leftJoinAndSelect('order.orderDetails', 'orderDetail')
      // Dołączamy relację product w ramach orderDetails
      .leftJoinAndSelect('orderDetail.product', 'product')
      .where('order.order_id = :id', { id });

    if (orderDetailSelect.length > 0) {
      query = query.addSelect(orderDetailSelect);
    }
    if (productSelect.length > 0) {
      query = query.addSelect(productSelect);
    }

    const order = await query.getOne();
    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }
    return order;
  }
}
