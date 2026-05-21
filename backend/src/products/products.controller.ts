import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  UseGuards,
  Delete,
} from '@nestjs/common';

import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { AdminGuard } from 'src/auth/admin.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('products')

export class ProductsController {

  constructor(
    private productsService: ProductsService
  ) { }

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

  @UseGuards(
    JwtAuthGuard,
    AdminGuard
  )

  createProduct(
    @Body() data: CreateProductDto
  ) {
    return this.productsService.createProduct(data);
  }

  @Delete(':id')

  @UseGuards(
    JwtAuthGuard,
    AdminGuard
  )

  deleteProduct(
    @Param('id') id: string
  ) {

    return this.productsService.deleteProduct(
      Number(id)
    )
  }
}