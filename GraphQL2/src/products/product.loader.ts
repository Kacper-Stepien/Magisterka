// product.loader.ts
import * as DataLoader from 'dataloader';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductLoader {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  // Tworzymy DataLoader, który przyjmuje tablicę identyfikatorów produktów
  // i zwraca odpowiadające im produkty w jednej operacji
  public readonly batchProducts = new DataLoader<number, Product>(
    async (productIds: number[]) => {
      // Pobierz produkty, których identyfikatory znajdują się w productIds
      const products = await this.productRepository
        .createQueryBuilder('product')
        .where('product.product_id IN (:...ids)', { ids: productIds })
        .getMany();

      // Mapowanie wyników – DataLoader oczekuje, że zwrócone zostaną wyniki w kolejności odpowiadającej productIds
      const productMap: { [key: number]: Product } = {};
      products.forEach((product) => {
        productMap[product.product_id] = product;
      });

      // Dla każdego id zwracamy odpowiadający produkt (lub undefined, jeśli nie znaleziono)
      return productIds.map((id) => productMap[id]);
    },
  );
}
