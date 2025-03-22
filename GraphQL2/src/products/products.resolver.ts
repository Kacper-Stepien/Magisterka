import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { Product } from './product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { ProductSupplierLoader } from 'src/suppliers/product-supplier.loader';
import { Supplier } from 'src/suppliers/supplier.entity';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(
    private readonly productsService: ProductsService,
    private readonly productSupplierLoader: ProductSupplierLoader,
  ) {}

  @Query(() => [Product], { name: 'products' })
  async getProducts(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Query(() => Product, { name: 'product' })
  async getProduct(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Product> {
    return this.productsService.findOne(id);
  }

  @ResolveField(() => Supplier, { name: 'supplier' })
  async getSupplier(@Parent() product: Product): Promise<Supplier> {
    return this.productSupplierLoader.batchSuppliers.load(product.supplier_id);
  }

  @Mutation(() => Product, { name: 'createProduct' })
  async createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
  ): Promise<Product> {
    return this.productsService.create(createProductInput);
  }

  @Mutation(() => Product, { name: 'updateProduct' })
  async updateProduct(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
  ): Promise<Product> {
    return this.productsService.update(id, updateProductInput);
  }

  @Mutation(() => Product, { name: 'removeProduct' })
  async removeProduct(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Product> {
    await this.productsService.remove(id);
    return { product_id: id } as Product;
  }
}
