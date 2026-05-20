import { 
  Body,
  Controller,
  Get,
  Post,
 } from '@nestjs/common';

import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('products')

export class ProductsController {

  constructor(
    private productsService: ProductsService
  ) {}

  @Get()

  getProducts() {

    return this.productsService.getAllProducts();
  }

  @Post()

  createProduct(
    @Body() data: CreateProductDto
  ) {
    return this.productsService.createProduct(data);
  }
}