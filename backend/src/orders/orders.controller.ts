import {
    Body,
    Controller,
    Get,
    Post,
    Req,
    UseGuards,
} from '@nestjs/common'

import { OrdersService }
    from './orders.service'

import { JwtAuthGuard }
    from 'src/auth/jwt-auth.guard'

import { CreateOrderDto }
    from './dto/create-order.dto'
import { AdminGuard } from 'src/auth/admin.guard'

@Controller('orders')

@UseGuards(JwtAuthGuard)

export class OrdersController {

    constructor(
        private ordersService: OrdersService
    ) { }

    @Post()

    createOrder(
        @Req() req: any,

        @Body() body: CreateOrderDto
    ) {

        return this.ordersService.createOrder(
            req.user.userId,
            body
        )
    }

    @Get()

    getOrders(@Req() req: any) {

        return this.ordersService.getUserOrders(
            req.user.userId
        )
    }

    @Get('admin/all')

    @UseGuards(
        JwtAuthGuard,
        AdminGuard
    )

    getAllOrders() {

        return this.ordersService.getAllOrders()
    }
}