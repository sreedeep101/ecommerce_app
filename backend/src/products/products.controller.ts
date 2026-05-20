import { 
  Body,
  Controller,
  Get,
  Post,
  Param,
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

  @Get(':id')

  getProduct(
    @Param('id') id: string
  ) {
    return this.productsService.getProductById(
      Number(id)
    )
  }

  @Post()

  createProduct(
    @Body() data: CreateProductDto
  ) {
    return this.productsService.createProduct(data);
  }
}