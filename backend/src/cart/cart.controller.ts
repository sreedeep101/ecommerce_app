import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common'

import { CartService } from './cart.service'

import { JwtAuthGuard }
from 'src/auth/jwt-auth.guard'

import { AddToCartDto }
from './dto/add-to-cart.dto'

@Controller('cart')

@UseGuards(JwtAuthGuard)

export class CartController {

  constructor(
    private cartService: CartService
  ) {}

  @Get()

  getCart(@Req() req: any) {

    return this.cartService.getUserCart(
      req.user.userId
    )
  }

  @Post('add')

  addToCart(
    @Req() req: any,

    @Body() body: AddToCartDto
  ) {

    return this.cartService.addToCart(
      req.user.userId,
      body
    )
  }

  @Delete(':id')

  removeItem(
    @Param('id') id: string
  ) {

    return this.cartService.removeCartItem(
      Number(id)
    )
  }
}